import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { surveyPlugin } from 'survey-vue3-ui';
import VueGtag from 'vue-gtag-next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueYandexMetrika from 'vue3-yandex-metrika';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import { setAppInstance } from '@/utils/appInstance';

import '@/styles/common.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV;

export function initApp(
    RootComponent: any,
    appRouter: any,
    mountComponent: string
) {
    const app = createApp(RootComponent);

    app.use(createPinia());
    app.use(appRouter);
    app.use(surveyPlugin);
    app.use(PrimeVue);
    app.use(ToastService);
    app.use(DialogService);
    app.use(ConfirmationService);
    app.use(VueYandexMetrika, {
        id: 93868095,
        router: appRouter,
        env: env,
    });
    app.use(VueGtag, {
        property: {
            id: 'G-DN8BB75PFS',
        },
        isEnabled: env !== 'development',
    });

    setAppInstance(app);

    app.mount(mountComponent);
}
