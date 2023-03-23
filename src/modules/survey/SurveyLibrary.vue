<template>
  <div id="survey" />
</template>

<script setup lang="ts">
import { Survey } from "survey-knockout-ui";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSurveyStore } from "./store/survey.store.js";

const router = useRouter();
const surveyStore = useSurveyStore();
const surveyJson = computed(() => surveyStore.questions);

onMounted(() => {
  const survey = new Survey(surveyJson.value);
  survey.locale = "ru";

  const surveyComplete = (sender: { data: Record<string, string[]> }): void => {
    const newData: Record<string, string[]> = {};
    for (let key in sender.data) {
      Array.isArray(sender.data[key]) ? (newData[key] = sender.data[key]) : (newData[key] = [`${sender.data[key]}`]);

      newData[key] = newData[key].includes("none") ? ["Без особенностей"] : newData[key];
    }

    surveyStore.postAnswersData({ answers: newData });
    router.push({
      path: "/result",
    });
  };
  survey.onComplete.add(surveyComplete);
  survey.render("survey");
});
</script>
