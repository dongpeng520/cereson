import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { Route } from 'vue-router';
import { UserModule } from '@/store/modules/user';
import { PermissionModule } from './store/modules/permission';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async(to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start();

  // Determine whether the user has logged in
  if (UserModule.token) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      // Check whether the user has obtained his permission roles
      if (UserModule.roles.length === 0) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await UserModule.GetUserInfo();
          const roles = UserModule.roles;
          // Generate accessible routes map based on role
          PermissionModule.GenerateRoutes(roles);
          // Dynamically add accessible routes
          console.log(router);
          console.log(PermissionModule.dynamicRoutes);
          (router as any).options.routes.forEach((ele: any) => {
            if (to.path.indexOf('/master') > -1 && ele.path.indexOf('/master') > -1) {
              ele.meta.hidden = false;
            }
            if (to.path.indexOf('/host') > -1 && ele.path.indexOf('/host') > -1) {
              ele.meta.hidden = false;
            }
            if (to.path.indexOf('/client') > -1 && ele.path.indexOf('/client') > -1) {
              ele.meta.hidden = false;
            }
          });
          router.addRoutes(PermissionModule.dynamicRoutes);
          console.log(router);
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (err) {
          // Remove token and redirect to login page
          UserModule.ResetToken();
          Message.error(err || 'Has Error');
          next(`/login`);
          // next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        next();
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next();
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login`);
      // next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();

  // set page title
  document.title = to.meta.title;
});
