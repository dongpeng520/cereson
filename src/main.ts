import Vue, { DirectiveOptions } from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';

import '@/styles/element-variables.scss';
import '@/styles/index.scss';

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import '@/icons/components';
import '@/permission';
import * as directives from '@/directives/index';
import i18n from '@/lang';
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
});
// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key]);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
