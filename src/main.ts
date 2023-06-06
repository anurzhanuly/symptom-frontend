import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueYandexMetrika from 'vue-yandex-metrika';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import { StylesManager } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import 'survey-core/survey.i18n';

StylesManager.applyTheme('defaultV2');

export const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(VueYandexMetrika, {
    id: 93868095,
    router: router,
    // env: process.env.NODE_ENV, // не обязательно, но рекомендуется для различения разработки и продакшна
});

app.mount('#app');
