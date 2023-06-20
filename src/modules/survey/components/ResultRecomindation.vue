<template>
    <div>
        <card>
            <template #title> Рекомендации </template>
            <template #content>
                <panel
                    v-for="(recommendation, index) in recommendations"
                    :key="index"
                    :header="(index + 1).toString()"
                >
                    <p v-html="recommendation" />
                </panel>
            </template>
            <template v-if="isButtonsVisible" #footer>
                <p-button
                    label="Открыть в PDF"
                    raised
                    @click="surveyStore.resultPDF"
                />
            </template>
        </card>
    </div>
</template>

<script setup lang="ts">
import { useSurveyStore } from '@/modules/survey/store/survey.store';
import { storeToRefs } from 'pinia';

import Card from 'primevue/card';
import PButton from 'primevue/button';
import Panel from 'primevue/panel';

const surveyStore = useSurveyStore();
const { recommendations, isButtonsVisible } = storeToRefs(surveyStore);
</script>
