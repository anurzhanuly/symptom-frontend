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
      path: "/clientSignup",
      name: "clientSignup",
      component: (): Component => import("@/modules/authorization/AuthorizationCabinet.vue"),
    },
    {
      path: "/clientSignin",
      name: "clientSignin",
      component: (): Component => import("@/modules/authorization/AuthorizationCabinet.vue"),
    },
    {
      path: "/doctorSignin",
      name: "doctorSignin",
      component: (): Component => import("@/modules/authorization/AuthorizationDoctor.vue"),
    },
    {
      path: "/agreement",
      name: "agreement",
      component: (): Component => import("@/modules/authorization/AuthorizationAgreementView.vue"),
    },
    {
      path: "/onboarding",
      name: "onboarding",
      component: (): Component => import("@/modules/authorization/OnboardingMobile.vue"),
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
      path: "/patientcab",
      name: "patientcab",
      component: (): Component => import("@/modules/patientsCabinet/PatientCabinet.vue"),
      children: [
        {
          path: "main",
          component: (): Component => import("@/modules/patientsCabinet/views/PatientCabinetMain.vue"),
        },
        {
          path: "settings",
          component: (): Component => import("@/modules/patientsCabinet/views/PatientCabinetSettings.vue"),
        },
      ],
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
      path: "/cabinet",
      name: "cabinet",
      component: (): Component => import("@/modules/doctorCabinet/DoctorCabinet.vue"),
      children: [
        {
          path: "main",
          component: (): Component => import("@/modules/doctorCabinet/views/DoctorCabinetMain.vue"),
        },
        {
          path: "patients",
          component: (): Component => import("@/modules/doctorCabinet/views/DoctorCabinetPatients.vue"),
        },
        {
          path: "settings",
          component: (): Component => import("@/modules/doctorCabinet/views/DoctorCabinetSettings.vue"),
        },
        {
          path: "result",
          component: (): Component => import("@/modules/doctorCabinet/views/DoctorCabinetResult.vue"),
        },
      ],
    },
  ],
});

export default router;
