import { getQuestionsJson } from "@/modules/admin/services/admin.refbooks";
import type { QuestionsContent } from "@/modules/admin/types/questions";
import { postAnswersToChatGPT } from "../services/survey.refbooks";
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useSurveyStore = defineStore("survey", () => {
  const resultAnswersChatGPT = ref<Record<string, string[]>>();
  const questions = ref<QuestionsContent>();
  const pationsCard = ref<any>();
  const recommendationsChatGPT = ref();
  const recommendations = ref();

  async function getQuestionsData() {
    const res = await getQuestionsJson();
    if (!axios.isAxiosError(res)) {
      questions.value = res.data.content;
    }

    return res;
  }

  async function postAnswersDataChatGPT(data: { answers: Record<string, string[]> }) {
    resultAnswersChatGPT.value = data.answers;
    try {
      const res = await postAnswersToChatGPT(data);
      console.log("postAnswersDataChatGPT  res:", res);

      if (!axios.isAxiosError(res)) {
        pationsCard.value = res.data.patientCard;
        const JSONstring = JSON.parse(res.data.symptomAi);
        recommendationsChatGPT.value = JSON.parse(JSONstring);
      }
    } catch (e) {
      console.error(e);
      recommendationsChatGPT.value = null;
    }
  }

  function stringTitle(title: any): string {
    if (typeof title === "number") {
      return title.toString();
    }

    return title;
  }

  return {
    questions,
    pationsCard,
    recommendations,
    recommendationsChatGPT,
    postAnswersDataChatGPT,
    getQuestionsData,
    stringTitle,
  };
});
