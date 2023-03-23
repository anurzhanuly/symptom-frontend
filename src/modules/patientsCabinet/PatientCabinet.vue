<template>
  <base-header />
  <div class="patient-cabinet">
    <base-side-bar :views="patientViews" />
    <div class="patient-view">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/BaseHeader.vue";
import BaseSideBar from "@/components/BaseSideBar.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  const router = useRouter();
  router.push("/patientcab/main");
});

const patientViews = ref([
  {
    label: "Главная",
    icon: "pi pi-fw pi-home",
    to: "/patientcab/main",
  },
  {
    label: "Настройки",
    icon: "pi pi-fw pi-pencil",
    to: "/patientcab/settings",
  },
]);
</script>

<style>
.patient-cabinet {
  display: flex;
}
.patient-view {
  flex: 1;
}
</style>
