import router from './router';
import App from './App.vue';
import { initApp } from '@/utils/initApp';

export function initDesktopApp() {
    initApp(App, router, '#desktop');
}
