<template>
    <div v-if="isResultVisible">
        <card>
            <template #title> Карточка пациента </template>
            <template #content>
                <panel
                    v-for="(info, title) in pationsCard"
                    :key="title"
                    :header="surveyStore.stringTitle(title)"
                    toggleable
                >
                    <p v-for="(value, key) in info" :key="key">
                        {{ key }} {{ value }}
                    </p>
                </panel>
            </template>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { useSurveyStore } from '../../survey/store/survey.store';
import { storeToRefs } from 'pinia';

import Card from 'primevue/card';
import Panel from 'primevue/panel';

const surveyStore = useSurveyStore();
const { pationsCard, isResultVisible } = storeToRefs(surveyStore);
</script>

<style scoped>
.p-panel {
    margin-bottom: 10px;
}
</style>
