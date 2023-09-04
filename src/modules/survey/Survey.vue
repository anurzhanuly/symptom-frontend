<script setup lang="ts">
import { ref, computed } from 'vue';
import 'survey-core/defaultV2.min.css';
import 'survey-core/survey.i18n';
import { Model } from 'survey-core';
import { useSurveyStore } from '@/modules/survey/store/survey.store';

const surveyStore = useSurveyStore();

const surveyJson = computed(() => surveyStore.questions);

const survey = new Model(surveyJson.value);
survey.locale = 'ru';

const surveyResults = ref<string>('');

survey.onComplete.add((sender) => {
    surveyResults.value = JSON.stringify(sender.data, null, 3);
    console.log(surveyResults.value);
});
</script>

<template>
    <SurveyComponent :model="survey" />
</template>
