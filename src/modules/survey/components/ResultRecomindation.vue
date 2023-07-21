<template>
    <div>
        <card>
            <template #title> Рекомендации </template>
            <template #content>
                <panel
                    v-for="(item, index) in recommendations"
                    :key="index"
                    :header="item.title"
                    toggleable
                >
                    <p v-html="item.recommendation" />
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
