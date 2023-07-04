import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/modules/home/HomeView.vue';
import type { Component } from 'vue';

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
                import('@/modules/authorization/ChooseSurveyFlow.vue'),
        },
        {
            path: '/client-test-auth',
            name: 'client-test-auth',
            component: (): Component =>
                import('@/modules/authorization/ClientTestAuthorization.vue'),
        },
        {
            path: '/client-sign-in',
            name: 'client-sign-in',
            component: (): Component =>
                import('@/modules/authorization/AuthorizationClientView.vue'),
        },
        {
            path: '/doctor-sign-in',
            name: 'doctor-sign-in',
            component: (): Component =>
                import('@/modules/authorization/AuthorizationDoctorView.vue'),
        },
        {
            path: '/agreement/:register?',
            name: 'agreement',
            component: (): Component =>
                import(
                    '@/modules/authorization/AuthorizationAgreementView.vue'
                ),
        },
        {
            path: '/result',
            name: 'result',
            component: (): Component =>
                import('@/modules/survey/ResultView.vue'),
            redirect: () => {
                return { path: '/result/recommendation' };
            },
            children: [
                {
                    path: 'recommendation',
                    component: (): Component =>
                        import(
                            '@/modules/survey/components/ResultRecomindation.vue'
                        ),
                },
                {
                    path: 'card',
                    component: (): Component =>
                        import(
                            '@/modules/survey/components/ResultPatientCard.vue'
                        ),
                },
            ],
        },
        {
            path: '/survey',
            name: 'survey',
            component: (): Component =>
                import('@/modules/survey/SurveyView.vue'),
        },
        {
            path: '/admin',
            name: 'admin',
            component: (): Component => import('@/modules/admin/AdminView.vue'),
            children: [
                {
                    path: 'quest',
                    component: (): Component =>
                        import(
                            '@/modules/admin/components/ChangeJSONQuestions.vue'
                        ),
                },
                {
                    path: 'cond',
                    component: (): Component =>
                        import(
                            '@/modules/admin/components/ChangeConditions.vue'
                        ),
                },
                {
                    path: 'recom',
                    component: (): Component =>
                        import(
                            '@/modules/admin/components/ChangeRecommendations.vue'
                        ),
                },
                {
                    path: 'magic',
                    component: (): Component =>
                        import('@/modules/admin/components/ChangeName.vue'),
                },
                {
                    path: 'clinics',
                    component: (): Component =>
                        import('@/modules/admin/components/ClinicsLists.vue'),
                },
            ],
        },
        {
            path: '/doctor-cabinet',
            name: 'doctor-cabinet',
            component: (): Component =>
                import('@/modules/cabinets/DoctorCabinetView.vue'),
            redirect: () => {
                return { path: '/doctor-cabinet/main' };
            },
            children: [
                {
                    path: 'main',
                    component: (): Component =>
                        import('@/modules/cabinets/DoctorCabinetMain.vue'),
                },
                {
                    path: 'patients',
                    component: (): Component =>
                        import('@/modules/cabinets/DoctorCabinetPatients.vue'),
                },
                {
                    path: 'settings',
                    component: (): Component =>
                        import('@/modules/cabinets/DoctorCabinetSettings.vue'),
                },
                {
                    path: 'result/:id',
                    component: (): Component =>
                        import('@/modules/cabinets/CabinetResult.vue'),
                },
            ],
        },
        {
            path: '/client-cabinet',
            name: '/client-cabinet',
            component: (): Component =>
                import('@/modules/cabinets/ClientCabinetView.vue'),
            redirect: () => {
                return { path: '/client-cabinet/main' };
            },
            children: [
                {
                    path: 'main',
                    component: (): Component =>
                        import('@/modules/cabinets/ClientCabinetMain.vue'),
                },
                {
                    path: 'result/:id',
                    component: (): Component =>
                        import('@/modules/cabinets/CabinetResult.vue'),
                },
            ],
        },
    ],
});

export default router;
