// import Cookies from 'js-cookie';
import { mystorage } from '@/utils/validate';
// App
const sidebarStatusKey = 'sidebar_status';
export const getSidebarStatus = () => mystorage.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) => mystorage.set(sidebarStatusKey, sidebarStatus);

// User
const tokenKey = 'vue_typescript_admin_access_token';
export const getToken = () => mystorage.get(tokenKey);
export const setToken = (token: string) => mystorage.set(tokenKey, token);
export const removeToken = () => mystorage.remove(tokenKey);

const languageKey = 'language';
export const getLanguage = () => mystorage.get(languageKey);
export const setLanguage = (language: string) => mystorage.set(languageKey, language);
