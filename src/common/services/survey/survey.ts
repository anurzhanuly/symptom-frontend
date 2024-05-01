import type { AxiosError } from 'axios';
import { useSymptomApi } from '@/common/services/api';

export const postAnswers = async (data: {
    answers: Record<string, string[]>;
    patientID: number;
    doctorID: number;
}): Promise<any> => {
    try {
        return await useSymptomApi.post(
            '/recommendations?key=SymptomAlgaBas',
            data
        );
    } catch (error) {
        const err = error as AxiosError<Error>;
        console.log(error);
        return err;
    }
};

export const postAnswersDiseases = async (
    data: {
        answers: Record<string, string[]>;
        patientID: number;
        doctorID: number;
    },
    id: string
): Promise<any> => {
    try {
        return await useSymptomApi.post(
            `/diseases/${id}/getRecommendation`,
            data
        );
    } catch (error) {
        const err = error as AxiosError<Error>;
        console.log(error);
        return err;
    }
};
