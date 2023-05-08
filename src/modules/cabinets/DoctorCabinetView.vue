<template>
  <base-header />
  <div class="doctor-cabinet">
    <cabinet-side-bar :views="doctorViews" />
    <div class="doctor-view">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import CabinetSideBar from "./components/CabinetSideBar.vue";
import BaseHeader from "@/components/BaseHeader.vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

onMounted(() => {
  const router = useRouter();
  router.push("/doctor-cabinet/main");
});

const doctorViews = ref([
  {
    label: "Главная",
    icon: "pi pi-fw pi-book",
    to: "/doctor-cabinet/main",
  },
  {
    label: "Пациенты",
    icon: "pi pi-fw pi-users",
    to: "/doctor-cabinet/patients",
  },
  {
    label: "Настройки",
    icon: "pi pi-fw pi-exclamation-circle",
    to: "/doctor-cabinet/settings",
  },
]);
</script>

<style scoped>
.doctor-cabinet {
  display: flex;
}

.doctor-view {
  width: -webkit-fill-available;
}
</style>
