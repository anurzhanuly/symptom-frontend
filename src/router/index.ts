import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/modules/home/HomeView.vue";
import type { Component } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/client-sign-in",
      name: "client-sign-in",
      component: (): Component => import("@/modules/authorization/AuthorizationClientView.vue"),
    },
    {
      path: "/doctor-sign-in",
      name: "doctor-sign-in",
      component: (): Component => import("@/modules/authorization/AuthorizationDoctorView.vue"),
    },
    {
      path: "/agreement",
      name: "agreement",
      component: (): Component => import("@/modules/authorization/AuthorizationAgreementView.vue"),
    },
    {
      path: "/result",
      name: "result",
      component: (): Component => import("@/modules/survey/ResultView.vue"),
    },
    {
      path: "/survey",
      name: "survey",
      component: (): Component => import("@/modules/survey/SurveyView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: (): Component => import("@/modules/admin/AdminView.vue"),
      children: [
        {
          path: "quest",
          component: (): Component => import("@/modules/admin/components/ChangeJSONQuestions.vue"),
        },
        {
          path: "cond",
          component: (): Component => import("@/modules/admin/components/ChangeConditions.vue"),
        },
        {
          path: "recom",
          component: (): Component => import("@/modules/admin/components/ChangeRecommendations.vue"),
        },
        {
          path: "magic",
          component: (): Component => import("@/modules/admin/components/ChangeName.vue"),
        },
        {
          path: "clinics",
          component: (): Component => import("@/modules/admin/components/ClinicsLists.vue"),
        },
      ],
    },
    {
      path: "/doctor-cabinet",
      name: "doctor-cabinet",
      component: (): Component => import("@/modules/cabinets/DoctorCabinetView.vue"),
      children: [
        {
          path: "main",
          component: (): Component => import("@/modules/cabinets/components/DoctorCabinetMain.vue"),
        },
        {
          path: "patients",
          component: (): Component => import("@/modules/cabinets/components/DoctorCabinetPatients.vue"),
        },
        {
          path: "settings",
          component: (): Component => import("@/modules/cabinets/components/DoctorCabinetSettings.vue"),
        },
        {
          path: "result",
          component: (): Component => import("@/modules/cabinets/components/DoctorCabinetResult.vue"),
        },
      ],
    },
    {
      path: "/client-cabinet",
      name: "/client-cabinet",
      component: (): Component => import("@/modules/cabinets/ClientCabinetView.vue"),
      children: [
        {
          path: "main",
          component: (): Component => import("@/modules/cabinets/components/ClientCabinetMain.vue"),
        },
      ],
    },
  ],
});

export default router;
