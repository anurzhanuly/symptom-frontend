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
        </card>
    </div>
</template>

<script setup lang="ts">
import { useSurveyStore } from '@/modules/survey/store/survey.store';
import { storeToRefs } from 'pinia';

import Card from 'primevue/card';
import Panel from 'primevue/panel';

const surveyStore = useSurveyStore();
const { recommendations } = storeToRefs(surveyStore);
</script>
