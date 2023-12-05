import type { Component } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { trackRouter } from 'vue-gtag-next';
import HomeView from '@desktop/modules/home/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/choose-survey-flow',
            name: 'choose-survey-flow',
            component: (): Component =>
                import('@desktop/modules/authorization/ChooseSurveyFlow.vue'),
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: (): Component =>
                import(
                    '@desktop/modules/authorization/AuthorizationAgreementView.vue'
                ),
        },
        {
            path: '/client-test-auth',
            name: 'client-test-auth',
            component: (): Component =>
                import(
                    '@desktop/modules/authorization/ClientTestAuthorization.vue'
                ),
        },
        {
            path: '/client-sign-in',
            name: 'client-sign-in',
            component: (): Component =>
                import(
                    '@desktop/modules/authorization/AuthorizationClientView.vue'
                ),
        },
        {
            path: '/doctor-sign-in',
            name: 'doctor-sign-in',
            component: (): Component =>
                import(
                    '@desktop/modules/authorization/AuthorizationDoctorView.vue'
                ),
        },
        {
            path: '/result',
            name: 'result',
            component: (): Component =>
                import('@desktop/modules/survey/ResultView.vue'),
            redirect: () => {
                return { path: '/result/recommendation' };
            },
            children: [
                {
                    path: 'recommendation',
                    component: (): Component =>
                        import(
                            '@desktop/modules/survey/components/ResultRecomindation.vue'
                        ),
                },
                {
                    path: 'card',
                    component: (): Component =>
                        import(
                            '@desktop/modules/survey/components/ResultPatientCard.vue'
                        ),
                },
            ],
        },
        {
            path: '/survey',
            name: 'survey',
            component: (): Component =>
                import('@desktop/modules/survey/Survey.vue'),
        },
        {
            path: '/admin',
            name: 'admin',
            component: (): Component =>
                import('@desktop/modules/admin/AdminView.vue'),
            children: [
                {
                    path: 'quest',
                    component: (): Component =>
                        import(
                            '@desktop/modules/admin/components/ChangeJSONQuestions.vue'
                        ),
                },
                {
                    path: 'cond',
                    component: (): Component =>
                        import(
                            '@desktop/modules/admin/components/ChangeConditions.vue'
                        ),
                },
                {
                    path: 'recom',
                    component: (): Component =>
                        import(
                            '@desktop/modules/admin/components/ChangeRecommendations.vue'
                        ),
                },
                {
                    path: 'magic',
                    component: (): Component =>
                        import(
                            '@desktop/modules/admin/components/ChangeName.vue'
                        ),
                },
                {
                    path: 'clinics',
                    component: (): Component =>
                        import(
                            '@desktop/modules/admin/components/ClinicsLists.vue'
                        ),
                },
            ],
        },
        {
            path: '/doctor-cabinet',
            name: 'doctor-cabinet',
            component: (): Component =>
                import('@desktop/modules/cabinets/DoctorCabinetMain.vue'),
        },
        {
            path: '/doctor-cabinet-result',
            name: 'doctor-cabinet-result',
            component: (): Component =>
            import('@desktop/modules/cabinets/CabinetResult.vue'),
        },
        {
            path: '/doctor-cabinet-settings',
            name: 'doctor-cabinet-settings',
            component: (): Component =>
            import('@desktop/modules/cabinets/DoctorCabinetSettings.vue'),
        },
        {
            path: '/client-cabinet',
            name: 'client-cabinet',
            component: (): Component =>
                import('@desktop/modules/cabinets/ClientCabinetMain.vue'),
        },
        {
            path: '/client-cabinet-result',
            name: 'client-cabinet-result',
            component: (): Component =>
                import('@desktop/modules/cabinets/CabinetResult.vue'),
        },
    ],
});

trackRouter(router);

export default router;
