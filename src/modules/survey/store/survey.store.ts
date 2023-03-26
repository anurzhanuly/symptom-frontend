import { getQuestionsJson } from "@/modules/admin/services/admin.refbooks";
import type { QuestionsContent } from "@/modules/admin/types/questions";
import { postAnswers, postAnswersToChatGPT } from "../services/survey.refbooks";
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useSurveyStore = defineStore("survey", () => {
  const resultAnswers = ref<Record<string, string[]>>();
  const resultAnswersChatGPT = ref<Record<string, string[]>>();
  const questions = ref<QuestionsContent>();
  const recommendations = ref([
    {
      name: "Короче, нет ничего",
      tests: ["Вы здоровы"],
      recommendations: ["Вы здоровы"],
      importance: "",
    },
  ]);

  const recommendationsChatGPT = ref<Record<string, object|string[]>>();

  async function getQuestionsData() {
    const res = await getQuestionsJson();
    if (!axios.isAxiosError(res)) {
      questions.value = res.data.content;
    }

    return res;
  }

  async function postAnswersData(data: { answers: Record<string, string[]> }) {
    resultAnswers.value = data.answers;
    const res = await postAnswers(data);

    if (!axios.isAxiosError(res)) {
      if (res.data.recommendations) {
        recommendations.value = res.data.recommendations;
      }
    }
    return res;
  }

  async function postAnswersDataChatGPT(data: { answers: Record<string, string[]>; }) {
    resultAnswersChatGPT.value = data.answers;
    const recChatGPT = await postAnswersToChatGPT(data);

    if (!axios.isAxiosError(recChatGPT)) {
      if (recChatGPT.data) {
        recommendationsChatGPT.value = JSON.parse(recChatGPT.data);
      }
    }
    return recChatGPT;
  }

  return {
    resultAnswers,
    questions,
    recommendations,
    recommendationsChatGPT,
    postAnswersData,
    postAnswersDataChatGPT,
    getQuestionsData,
  };
});
