<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWebviewStore } from '@mobile/modules/webview/store/webview.store';

import ProgressBar from 'primevue/progressbar';
import Panel from 'primevue/panel';
import TabMenu from 'primevue/tabmenu';

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

const surveyResult = JSON.parse(localStorage.getItem('surveyResult') as string);

const webviewStore = useWebviewStore();
const { isLoading } = storeToRefs(webviewStore);
const { recommendationsChatGPT } = storeToRefs(webviewStore);
</script>

<template>
    <progress-bar
        v-if="isLoading"
        mode="indeterminate"
    />
    <tab-menu :model="SURVEY_PAGES" />
    <div class="recommendation">
        <h2 class="recommendation__title">Рекомендации</h2>
        <panel
            v-for="(item, index) in surveyResult.recommendations"
            :key="index"
            class="recommendation__panel"
            :header="item.title"
            toggleable
        >
            <p v-html="item.recommendation" />
        </panel>
        <h2 class="recommendation__title">Рекомендации от SymptomAi</h2>
        <panel
            v-for="(item, index) in recommendationsChatGPT"
            :key="index"
            class="recommendation__panel"
            :header="item.title"
            toggleable
        >
            <p v-html="item.recommendation" />
        </panel>
    </div>
</template>

<style scoped lang="scss">
.recommendation {
    padding: 16px;

    &__title {
        margin-bottom: 24px;
    }

    &__panel {
        margin-bottom: 16px;
    }
}
</style>
