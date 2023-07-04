import { getQuestionsJson } from '@/modules/admin/services/admin.refbooks';
import type { QuestionsContent } from '@/modules/admin/types/questions';
import { postAnswersToChatGPT } from '../services/survey.refbooks';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useSurveyStore = defineStore('survey', () => {
    const resultAnswersChatGPT = ref<Record<string, string[]>>();
    const questions = ref<QuestionsContent>();
    const pationsCard = ref<any>();
    const recommendationsChatGPT = ref();
    const recommendations = ref();
    const isLoading = ref(false);

    async function getQuestionsData(): Promise<void> {
        const res = await getQuestionsJson();

        if (res) {
            questions.value = res.data;
        }
    }

    async function postAnswersDataChatGPT(data: {
        answers: Record<string, string[]>;
        patientID: number;
        doctorID: number;
    }) {
        isLoading.value = true;
        resultAnswersChatGPT.value = data.answers;
        try {
            // TODO: Переписать
            const res = await postAnswersToChatGPT(data);

            if (!axios.isAxiosError(res)) {
                pationsCard.value = res.data.patientCard;
                recommendations.value = res.data.recommendations;
                const JSONstring = JSON.parse(res.data.symptomAi);
                const JSONstring2 = JSONstring.replace(/«|»/g, '"');
                recommendationsChatGPT.value = JSON.parse(JSONstring2);
            }
        } catch (e) {
            console.error(e);
            recommendationsChatGPT.value = null;
        } finally {
            isLoading.value = false;
        }
    }

    function stringTitle(title: any): string {
        if (typeof title === 'number') {
            return title.toString();
        }

        return title;
    }

    return {
        questions,
        isLoading,
        pationsCard,
        recommendations,
        recommendationsChatGPT,
        postAnswersDataChatGPT,
        getQuestionsData,
        stringTitle,
    };
});
