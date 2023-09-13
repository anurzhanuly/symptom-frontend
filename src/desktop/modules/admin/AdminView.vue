<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

import BaseHeader from '@desktop/components/BaseHeader.vue';
import TabMenu from 'primevue/tabmenu';
import router from '@desktop/router';

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

<template>
    <base-header />
    <tab-menu :model="adminPages" />
    <router-view />
</template>
