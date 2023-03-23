<template>
  <base-header />
  <div class="doctor-cabinet">
    <base-side-bar :views="cabinetViews" />
    <div class="doctor-view">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSideBar from "@/components/BaseSideBar.vue";
import BaseHeader from "@/components/BaseHeader.vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

onMounted(() => {
  const router = useRouter();
  router.push("/cabinet/main");
});

const cabinetViews = ref([
  {
    label: "Главная",
    icon: "pi pi-fw pi-book",
    to: "/cabinet/main",
  },
  {
    label: "Пациенты",
    icon: "pi pi-fw pi-users",
    to: "/cabinet/patients",
  },
  {
    label: "Настройки",
    icon: "pi pi-fw pi-exclamation-circle",
    to: "/cabinet/settings",
  },
]);
</script>

<style>
.doctor-cabinet {
  display: flex;
}

.doctor-view {
  width: -webkit-fill-available;
}
</style>
