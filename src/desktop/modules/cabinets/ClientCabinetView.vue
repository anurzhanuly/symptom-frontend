<script setup lang="ts">
import { ref } from 'vue';
import BaseHeader from '@desktop/components/BaseHeader.vue';
import TabMenu from 'primevue/tabmenu';

const clientViews = ref([
    {
        label: 'Главная',
        icon: 'pi pi-fw pi-book',
        to: '/client-cabinet/main',
    },
]);
</script>

<template>
    <base-header />
    <tab-menu :model="clientViews" />
    <div class="client-view">
        <router-view />
    </div>
</template>

<style scoped>
.client-cabinet {
    display: flex;
}

.client-view {
    width: -webkit-fill-available;
}
</style>
