<template>
    <base-header />
    <tab-menu :model="adminPages" />
    <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue';

import BaseHeader from '@/components/BaseHeader.vue';
import TabMenu from 'primevue/tabmenu';
import router from '@/router';

const adminPages = ref([
    {
        label: 'Изменить JSON вопросов',
        icon: 'pi pi-fw pi-pencil',
        to: '/admin/quest',
    },
    {
        label: 'Изменить условия рекомендаций',
        icon: 'pi pi-fw pi-file',
        to: '/admin/cond',
    },
    {
        label: 'Изменить рекомендации',
        icon: 'pi pi-fw pi-book',
        to: '/admin/recom',
    },
    {
        label: 'Изменить наименование',
        icon: 'pi pi-fw pi-database',
        to: '/admin/magic',
    },
    {
        label: 'Список клиник',
        icon: 'pi pi-fw pi-book',
        to: '/admin/clinics',
    },
]);

onBeforeMount(() => {
    if (!localStorage.getItem('admToken')) {
        router.replace({ name: 'home' });
    }
});
</script>
