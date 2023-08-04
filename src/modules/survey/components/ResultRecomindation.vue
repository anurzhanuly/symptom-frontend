<script setup lang="ts">
import { useSurveyStore } from '@/modules/survey/store/survey.store';
import { storeToRefs } from 'pinia';

import Card from 'primevue/card';
import Panel from 'primevue/panel';

const surveyStore = useSurveyStore();
const { recommendations, recommendationsChatGPT } = storeToRefs(surveyStore);
</script>

<template>
    <div>
        <card v-if="recommendations">
            <template #content>
                <h2 class="recommendation__title">Рекомендации</h2>
                <panel
                    v-for="(item, index) in recommendations"
                    :key="index"
                    class="recommendation__panel"
                    :header="item.title"
                    toggleable
                >
                    <p v-html="item.recommendation" />
                </panel>
                <h2
                    v-if="recommendationsChatGPT[0]?.recommendation"
                    class="recommendation__title"
                >
                    Рекомендации от SymptomAi
                </h2>
                <div
                    v-for="(item, index) in recommendationsChatGPT"
                    :key="index"
                >
                    <panel
                        v-if="item.recommendation"
                        class="recommendation__panel"
                        :header="item.title"
                        toggleable
                    >
                        <p v-html="item.recommendation" />
                    </panel>
                </div>
            </template>
        </card>
    </div>
</template>

<style scoped lang="scss">
.recommendation__title {
    margin-bottom: 24px;
}

.recommendation__panel {
    margin-bottom: 16px;
}
</style>
