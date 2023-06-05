<template>
    <header-bar />
    <main-bar />
    <about-project />
    <solutions />
    <advantages />
    <team />
    <footer-bar />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSurveyStore } from '@/modules/survey/store/survey.store';
import HeaderBar from './components/HeaderBar.vue';
import MainBar from './components/MainBar.vue';
import AboutProject from './components/AboutProject.vue';
import Solutions from './components/Solutions.vue';
import Advantages from './components/Advantages.vue';
import Team from './components/Team.vue';
import FooterBar from './components/FooterBar.vue';
import { storeToRefs } from 'pinia';

const surveyStore = useSurveyStore();
const { questions } = storeToRefs(surveyStore);

onMounted(() => {
    if (!questions.value) {
        surveyStore.getQuestionsData();
    }
});
</script>
