<template>
  <div v-if="isLoading" class="survey-loader">
    <p-progressSpinner strokeWidth="4" style="width: 80px; height: 80px;" />
  </div>
  <div v-else id="survey" />
</template>

<script setup lang="ts">
import { Survey } from "survey-knockout-ui";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSurveyStore } from "./store/survey.store.js";
import { ref } from 'vue';
import PProgressSpinner from 'primevue/progressspinner';

const router = useRouter();
const surveyStore = useSurveyStore();
const isLoading = ref(false);
const surveyJson = computed(() => surveyStore.questions);

onMounted(() => {
  const survey = new Survey(surveyJson.value);
  survey.locale = "ru";
  console.log(isLoading.value);

  const surveyComplete = (sender: { data: Record<string, string[]> }): void => {
    const newData: Record<string, string[]> = {};
    for (let key in sender.data) {
      Array.isArray(sender.data[key]) ? (newData[key] = sender.data[key]) : (newData[key] = [`${sender.data[key]}`]);

      newData[key] = newData[key].includes("none") ? ["Без особенностей"] : newData[key];
    }

    surveyStore.postAnswersDataChatGPT({ answers: newData });
    router.push({
      path: "/result",
    });
  };
  survey.onComplete.add(surveyComplete);
  survey.render("survey");

});
</script>

<style scoped>
.survey-loader {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
