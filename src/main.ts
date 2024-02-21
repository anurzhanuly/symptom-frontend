import { checkToken } from './utils/storage';

checkToken();
const isMobile = window.matchMedia('(max-width: 900px)').matches;

if (isMobile) {
    import('@mobile/main').then((module) => module.initMobileApp());
} else {
    import('@desktop/main').then((module) => module.initDesktopApp());
}

export {};
