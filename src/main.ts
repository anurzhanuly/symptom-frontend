import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueGtag from 'vue-gtag-next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueYandexMetrika from 'vue3-yandex-metrika';
import App from './App.vue';
import './styles/main.scss';
import router from './router';

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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV;

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
    env: env,
});
app.use(VueGtag, {
    property: {
        id: 'G-DN8BB75PFS',
    },
    isEnabled: env !== 'development',
});

app.mount('#app');
