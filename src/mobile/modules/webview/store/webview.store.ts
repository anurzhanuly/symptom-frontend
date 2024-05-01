import { ref } from 'vue';
import axios from 'axios';
import { getDoctors } from '@/common/services/admin/clinics';
import { postAnswers } from '@/common/services/survey/survey';
import { getClinicDoctors } from '@/common/services/authorization/authorization';
import type { Doctors } from '@/common/types/authorization/authorization';
import { getQuestionsJson } from '@/common/services/admin/admin';
import type { QuestionsContent } from '@/common/types/admin/questions';
import { defineStore } from 'pinia';

export const useWebviewStore = defineStore('webview', () => {
    const doctors = ref<{ id: string; name: string }[]>([]);
    const patientId = ref<string>('');
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

    async function getClinicDoctorsData(id: string): Promise<void> {
        const res = await getClinicDoctors(id);

        if (res) {
            doctors.value = res.data.included
                ? res.data.included.map((doctor: Doctors) => ({
                      id: doctor.id,
                      name: `${doctor.attributes.firstName} ${doctor.attributes.lastName} ${doctor.attributes.midName}`,
                  }))
                : [];
        }
    }

    async function getDoctorsData(): Promise<void> {
        const res = await getDoctors();

        if (res) {
            doctors.value = res.data.data
                ? res.data.data.map((doctor: Doctors) => ({
                      id: doctor.id,
                      name: `${doctor.attributes.firstName} ${doctor.attributes.lastName} ${doctor.attributes.midName}`,
                  }))
                : [];
        }
    }
    async function getQuestionsData(): Promise<void> {
        isLoading.value = true;

        const res = await getQuestionsJson();

        if (res) {
            questions.value = res.data;
        }

        isLoading.value = false;
    }

    async function postAnswersData(data: {
        answers: Record<string, string[]>;
        patientID: number;
        doctorID: number;
    }): Promise<any> {
        isLoading.value = true;
        resultAnswersChatGPT.value = data.answers;

        try {
            const res = await postAnswers(data);

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
        getClinicDoctorsData,
        getDoctorsData,
        postAnswersData,
        getQuestionsData,
        stringTitle,
        doctors,
        patientId,
        questions,
        isLoading,
        patientsCard,
        recommendations,
        recommendationsChatGPT,
        resultAnswersChatGPT,
    };
});
