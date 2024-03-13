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
            path: '/choose-survey-type',
            name: 'choose-survey-type',
            component: (): Component =>
                import('@mobile/modules/authorization/ChooseSurveyType.vue'),
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
            path: '/result-recommendation',
            name: 'result-recommendation',
            component: (): Component =>
                import(
                    '@mobile/modules/survey/components/ResultRecommendation.vue'
                ),
        },
        {
            path: '/result-card',
            name: 'result-card',
            component: (): Component =>
                import(
                    '@mobile/modules/survey/components/ResultPatientCard.vue'
                ),
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
                import('@mobile/modules/cabinets/DoctorCabinetMain.vue'),
        },
        {
            path: '/doctor-cabinet-result',
            name: 'doctor-cabinet-result',
            component: (): Component =>
                import('@mobile/modules/cabinets/CabinetResult.vue'),
        },
        {
            path: '/doctor-cabinet-settings',
            name: 'doctor-cabinet-settings',
            component: (): Component =>
                import('@mobile/modules/cabinets/DoctorCabinetSettings.vue'),
        },
        {
            path: '/client-cabinet',
            name: 'client-cabinet',
            component: (): Component =>
                import('@mobile/modules/cabinets/ClientCabinetMain.vue'),
        },
        {
            path: '/client-cabinet-diseases',
            name: 'client-cabinet-diseases',
            component: (): Component =>
                import('@mobile/modules/cabinets/ClientCabinetDiseases.vue'),
        },
        {
            path: '/client-cabinet-result',
            name: 'client-cabinet-result',
            component: (): Component =>
                import('@mobile/modules/cabinets/CabinetResult.vue'),
        },
        {
            path: '/client-cabinet-result-disease',
            name: 'client-cabinet-result-disease',
            component: (): Component =>
                import('@mobile/modules/cabinets/CabinetResultDisease.vue'),
        },
        {
            path: '/survey-flow-wv',
            name: '/survey-flow-wv',
            component: (): Component =>
                import('@mobile/modules/webview/ChooseSurveyFlow.vue'),
        },
        {
            path: '/agreement-wv',
            name: '/agreement-wv',
            component: (): Component =>
                import('@mobile/modules/webview/Agreement.vue'),
        },
        {
            path: '/survey-wv',
            name: '/survey-wv',
            component: (): Component =>
                import('@mobile/modules/webview/Survey.vue'),
        },
        {
            path: '/client-test-auth-wv',
            name: '/client-test-auth-wv',
            component: (): Component =>
                import('@mobile/modules/webview/ClientTestAuthorization.vue'),
        },
        {
            path: '/result-recommendation-wv',
            name: 'result-recommendation-wv',
            component: (): Component =>
                import('@mobile/modules/webview/ResultRecommendation.vue'),
        },
        {
            path: '/result-card-wv',
            name: 'result-card-wv',
            component: (): Component =>
                import('@mobile/modules/webview/ResultCard.vue'),
        },
    ],
});

trackRouter(router);

export default router;
