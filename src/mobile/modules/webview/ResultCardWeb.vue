<script lang="ts" setup>
import { useWebviewStore } from '@mobile/modules/webview/store/webview.store';

import Panel from 'primevue/panel';
import TabMenu from 'primevue/tabmenu';
import BaseHeader from '@/mobile/components/BaseHeader.vue';

const webviewStore = useWebviewStore();

const surveyResult = JSON.parse(localStorage.getItem('surveyResult') as string);

const SURVEY_PAGES = [
    {
        label: 'Рекомендации',
        icon: 'pi pi-fw pi-pencil',
        to: '/result-recommendation-web',
    },
    {
        label: 'Карточка',
        icon: 'pi pi-fw pi-file',
        to: '/result-card-web',
    },
];
</script>

<template>
    <tab-menu :model="SURVEY_PAGES" />
    <div class="patients-card">
        <h2 class="patients-card__title">Карточка пациента</h2>
        <panel
            v-for="(info, title) in surveyResult.patientCard"
            :key="title"
            :header="webviewStore.stringTitle(title)"
            toggleable
            class="patients-card__panel"
        >
            <p
                v-for="(value, key) in info"
                :key="key"
                class="patients-card__text"
            >
                {{ key }} {{ value }}
            </p>
        </panel>
    </div>
</template>

<style scoped lang="scss">
.patients-card {
    padding: 16px;

    &__title {
        margin-bottom: 24px;
    }

    &__panel {
        margin-bottom: 16px;
    }

    &__text {
        margin: 0;
    }
}
</style>
