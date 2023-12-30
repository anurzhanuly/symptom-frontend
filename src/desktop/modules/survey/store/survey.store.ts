import { getQuestionsJson } from '@desktop/modules/admin/services/admin.refbooks';
import type { QuestionsContent } from '@desktop/modules/admin/types/questions';
import { postAnswersToChatGPT } from '../services/survey.refbooks';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useSurveyStore = defineStore('survey', () => {
    const resultAnswersChatGPT = ref<Record<string, string[]>>({});
    const questions = ref<QuestionsContent>();
    const patientsCard = ref<any>();
    const recommendationsChatGPT = ref<
        {
            title: string;
            recommendation: string;
        }[]
    >([]);
    const recommendations = ref<
        {
            title: string;
            recommendation: string;
        }[]
    >([]);
    const isLoading = ref(false);

    async function getQuestionsData(): Promise<void> {
        isLoading.value = true;

        const res = await getQuestionsJson();

        if (res) {
            questions.value = res.data;
        }

        isLoading.value = false;
    }

    async function postAnswersDataChatGPT(data: {
        answers: Record<string, string[]>;
        patientID: number;
        doctorID: number;
    }): Promise<any> {
        isLoading.value = true;
        resultAnswersChatGPT.value = data.answers;

        try {
            const res = await postAnswersToChatGPT(data);

            if (!axios.isAxiosError(res)) {
                patientsCard.value = res.data.patientCard;
                recommendations.value = res.data.recommendations;
                recommendationsChatGPT.value = res.data.symptomAi;

                return res.data;
            }
        } catch (e) {
            console.error(e);
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
        patientsCard,
        recommendations,
        recommendationsChatGPT,
        resultAnswersChatGPT,
        postAnswersDataChatGPT,
        getQuestionsData,
        stringTitle,
    };
});
