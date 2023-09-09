import router from './router';
import App from './App.vue';
import { initApp } from '@/utils/initApp';

const appInstance = initApp(App, router);

export const app = appInstance;
