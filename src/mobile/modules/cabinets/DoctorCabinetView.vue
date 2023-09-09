<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import TabMenu from 'primevue/tabmenu';
import BaseHeader from '@mobile/components/BaseHeader.vue';

const doctorViews = ref([
    {
        label: 'Главная',
        icon: 'pi pi-fw pi-book',
        to: '/doctor-cabinet/main',
    },
    {
        label: 'Настройки',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/doctor-cabinet/settings',
    },
]);
</script>

<template>
    <base-header />
    <tab-menu :model="doctorViews" />
    <div class="doctor-view">
        <router-view />
    </div>
</template>

<style scoped>
.doctor-view {
    width: -webkit-fill-available;
}
</style>
