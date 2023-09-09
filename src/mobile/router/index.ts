import type { Component } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { trackRouter } from 'vue-gtag-next';
import HomeView from '@mobile/modules/home/HomeView.vue';

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
                import('@mobile/modules/authorization/ChooseSurveyFlow.vue'),
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: (): Component =>
                import(
                    '@mobile/modules/authorization/AuthorizationAgreementView.vue'
                ),
        },
        {
            path: '/client-test-auth',
            name: 'client-test-auth',
            component: (): Component =>
                import(
                    '@mobile/modules/authorization/ClientTestAuthorization.vue'
                ),
        },
        {
            path: '/client-sign-in',
            name: 'client-sign-in',
            component: (): Component =>
                import(
                    '@mobile/modules/authorization/AuthorizationClientView.vue'
                ),
        },
        {
            path: '/doctor-sign-in',
            name: 'doctor-sign-in',
            component: (): Component =>
                import(
                    '@mobile/modules/authorization/AuthorizationDoctorView.vue'
                ),
        },
        {
            path: '/result',
            name: 'result',
            component: (): Component =>
                import('@mobile/modules/survey/ResultView.vue'),
            redirect: () => {
                return { path: '/result/recommendation' };
            },
            children: [
                {
                    path: 'recommendation',
                    component: (): Component =>
                        import(
                            '@mobile/modules/survey/components/ResultRecomindation.vue'
                        ),
                },
                {
                    path: 'card',
                    component: (): Component =>
                        import(
                            '@mobile/modules/survey/components/ResultPatientCard.vue'
                        ),
                },
            ],
        },
        {
            path: '/survey',
            name: 'survey',
            component: (): Component =>
                import('@mobile/modules/survey/Survey.vue'),
        },
        {
            path: '/admin',
            name: 'admin',
            component: (): Component =>
                import('@mobile/modules/admin/AdminView.vue'),
            children: [
                {
                    path: 'quest',
                    component: (): Component =>
                        import(
                            '@mobile/modules/admin/components/ChangeJSONQuestions.vue'
                        ),
                },
                {
                    path: 'cond',
                    component: (): Component =>
                        import(
                            '@mobile/modules/admin/components/ChangeConditions.vue'
                        ),
                },
                {
                    path: 'recom',
                    component: (): Component =>
                        import(
                            '@mobile/modules/admin/components/ChangeRecommendations.vue'
                        ),
                },
                {
                    path: 'magic',
                    component: (): Component =>
                        import(
                            '@mobile/modules/admin/components/ChangeName.vue'
                        ),
                },
                {
                    path: 'clinics',
                    component: (): Component =>
                        import(
                            '@mobile/modules/admin/components/ClinicsLists.vue'
                        ),
                },
            ],
        },
        {
            path: '/doctor-cabinet',
            name: 'doctor-cabinet',
            component: (): Component =>
                import('@mobile/modules/cabinets/DoctorCabinetView.vue'),
            redirect: () => {
                return { path: '/doctor-cabinet/main' };
            },
            children: [
                {
                    path: 'main',
                    component: (): Component =>
                        import(
                            '@mobile/modules/cabinets/DoctorCabinetMain.vue'
                        ),
                },
                {
                    path: 'patients',
                    component: (): Component =>
                        import(
                            '@mobile/modules/cabinets/DoctorCabinetPatients.vue'
                        ),
                },
                {
                    path: 'settings',
                    component: (): Component =>
                        import(
                            '@mobile/modules/cabinets/DoctorCabinetSettings.vue'
                        ),
                },
                {
                    path: 'result/:id',
                    component: (): Component =>
                        import('@mobile/modules/cabinets/CabinetResult.vue'),
                },
            ],
        },
        {
            path: '/client-cabinet',
            name: '/client-cabinet',
            component: (): Component =>
                import('@mobile/modules/cabinets/ClientCabinetView.vue'),
            redirect: () => {
                return { path: '/client-cabinet/main' };
            },
            children: [
                {
                    path: 'main',
                    component: (): Component =>
                        import(
                            '@mobile/modules/cabinets/ClientCabinetMain.vue'
                        ),
                },
                {
                    path: 'result/:id',
                    component: (): Component =>
                        import('@mobile/modules/cabinets/CabinetResult.vue'),
                },
            ],
        },
    ],
});

trackRouter(router);

export default router;
