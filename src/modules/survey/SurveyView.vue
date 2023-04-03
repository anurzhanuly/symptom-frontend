<template>
  <div v-if="isLoading" class="survey-loader">
    <progress-spinner strokeWidth="4" style="width: 80px; height: 80px" />
  </div>
  <div v-else id="survey" />
</template>

<script setup lang="ts">
import { Survey } from "survey-knockout-ui";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSurveyStore } from "./store/survey.store.js";
import { ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";

const router = useRouter();
const surveyStore = useSurveyStore();
const isLoading = ref(false);
const surveyJson = computed(() => surveyStore.questions);

onMounted(() => {
  const survey = new Survey(surveyJson.value);
  survey.locale = "ru";

  const surveyComplete = (sender: { data: Record<string, string[]> }): void => {
    const newData: Record<string, string[]> = {};
    console.log("before  sender.data:", sender.data);
    for (let key in sender.data) {
      if (Array.isArray(sender.data[key])) {
        // Если ответ массив
        newData[key] = sender.data[key];
      } else if (typeof sender.data[key] === "object") {
        // Если ответ объект
        let result = "";

        for (const [item, value] of Object.entries(sender.data[key])) {
          result += `${item}: ${value}, `;
        }

        newData[key] = [result];
      } else {
        // Если ответ строка
        newData[key] = [`${sender.data[key]}`];
      }

      if (newData[key].includes("none")) {
        newData[key] = ["Без особенностей"];
      }

      if (newData[key].includes("other")) {
        newData[key] = newData[key + "-Comment"];
      }
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
