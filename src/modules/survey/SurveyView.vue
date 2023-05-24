<template>
  <progress-bar :value="progress" />
  <div id="survey" />
</template>

<script setup lang="ts">
import { Survey } from "survey-knockout-ui";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSurveyStore } from "./store/survey.store.js";

import ProgressBar from "primevue/progressbar";

const router = useRouter();
const surveyStore = useSurveyStore();
const progress = ref(0);
const progressLastValue = ref(0);
const surveyJson = computed(() => surveyStore.questions);

onMounted(() => {
    const survey = new Survey(surveyJson.value);
    survey.locale = "ru";

    function onSurveyComplete(sender: { data: Record<string, string[]> }): void {
        const newData: Record<string, string[]> = {};
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
                // Если выбрали Другое
                const commentKey = `${key}-Comment`;
                const value = sender.data[commentKey];
                newData[key] = [`${value}`];
            }
        }

        progress.value = 0;
        surveyStore.postAnswersDataChatGPT({ answers: newData });
        router.push({
            path: "/result"
        });
    }

    function onPageChange(_: any, options: any): void {
        if (options.isNextPage) {
            progress.value += 3;
            progressLastValue.value += 3;

            if (survey.isLastPage) {
                progress.value = 100;
            } else {
                progress.value = progressLastValue.value;
            }
        } else {
            progress.value -= 3;
            progressLastValue.value -= 3;
        }
    }

    survey.onCurrentPageChanged.add(onPageChange);
    survey.onComplete.add(onSurveyComplete);
    survey.render("survey");
});
</script>
