<script lang="ts" setup>
import { useSurveyStore } from './store/survey.store';
import { storeToRefs } from 'pinia';

import BaseHeader from '@/components/BaseHeader.vue';

import ProgressBar from 'primevue/progressbar';
import TabMenu from 'primevue/tabmenu';

const surveyStore = useSurveyStore();
const { isLoading } = storeToRefs(surveyStore);

const surveyPages = [
    {
        label: 'Рекомендации',
        icon: 'pi pi-fw pi-pencil',
        to: '/result/recommendation',
    },
    {
        label: 'Карточка',
        icon: 'pi pi-fw pi-file',
        to: '/result/card',
    },
];
</script>

<template>
    <section>
        <progress-bar
            v-if="isLoading"
            mode="indeterminate"
        />
        <base-header />
        <tab-menu :model="surveyPages" />
        <router-view />
    </section>
</template>

<style scoped>
section {
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    margin: 0 auto 40px;
}
</style>
