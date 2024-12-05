import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

import type { QuestionsContent } from '@/common/types/admin/questions';
import {
    getQuestionsJson,
    getDiseasesQuestionsJson,
} from '@/common/services/admin/admin';
import {
    postAnswers,
    postAnswersDiseases,
} from '@/common/services/survey/survey';

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

    async function getQuestionsData(diseaseId?: string): Promise<void> {
        isLoading.value = true;

        let res;
        if (diseaseId) {
            res = await getDiseasesQuestionsJson(diseaseId);

            if (res) {
                const result = res.data.data.attributes;
                questions.value = result.questionnaire;
            }
        } else {
            res = await getQuestionsJson();

            if (res) {
                questions.value = res.data;
            }
        }

        isLoading.value = false;
    }

    async function postAnswersData(
        data: {
            answers: Record<string, string[]>;
            patientID: number;
            doctorID: number;
            mobilePatientID: number;
        },
        diseaseId?: string
    ): Promise<any> {
        isLoading.value = true;
        resultAnswersChatGPT.value = data.answers;

        try {
            let res;

            if (diseaseId) {
                res = await postAnswersDiseases(data, diseaseId);
            } else {
                res = await postAnswers(data);
            }

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
        postAnswersData,
        getQuestionsData,
        stringTitle,
    };
});
