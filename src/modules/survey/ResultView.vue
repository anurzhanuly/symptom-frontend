<template>
  <section>
    <progress-bar
      v-if="isLoading"
      mode="indeterminate"
    />
    <base-header v-if="isButtonsVisible" />
    <result-patient-card />
    <result-recomindation />
    <result-recomindation-ai />
  </section>
</template>

<script lang="ts" setup>
import { useSurveyStore } from "./store/survey.store";
import { storeToRefs } from "pinia";

import BaseHeader from "@/components/BaseHeader.vue";
import ResultPatientCard from "./components/ResultPatientCard.vue";
import ResultRecomindation from "./components/ResultRecomindation.vue";
import ResultRecomindationAi from "./components/ResultRecomindationAi.vue";

import ProgressBar from "primevue/progressbar";

const surveyStore = useSurveyStore();
const { isLoading, isButtonsVisible } = storeToRefs(surveyStore);
</script>

<style scoped>
section {
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  margin: 0 auto 40px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
</style>
