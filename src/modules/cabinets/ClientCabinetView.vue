<template>
    <base-header />
    <div class="client-cabinet">
        <cabinet-side-bar :views="clientViews" />
        <div class="client-view">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/BaseHeader.vue";
import CabinetSideBar from "./components/CabinetSideBar.vue";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
    const router = useRouter();
    router.push("/client-cabinet/main");
});

const clientViews = ref([
    {
        label: "Главная",
        icon: "pi pi-fw pi-book",
        to: "/client-cabinet/main"
    },
    {
        label: "Настройки",
        icon: "pi pi-fw pi-exclamation-circle",
        to: "/client-cabinet/settings"
    }
]);
</script>

<style scoped>
.client-cabinet {
    display: flex;
}

.client-view {
    width: -webkit-fill-available;
}
</style>
