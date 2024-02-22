import { checkToken } from './utils/storage';

const isMobile = window.matchMedia('(max-width: 900px)').matches;

if (isMobile) {
    import('@mobile/main').then((module) => module.initMobileApp());
} else {
    import('@desktop/main').then((module) => module.initDesktopApp());
}

checkToken(); // Проверяем время токена и если оно больше 8 часов, удаляем из LocalStorage
export {};
