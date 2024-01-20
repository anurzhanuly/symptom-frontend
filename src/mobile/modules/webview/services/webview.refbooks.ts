import type { AxiosResponse, AxiosError } from 'axios';
import { useSymptomApi } from '@mobile/services/api';

export async function getClinicDoctors(
    id: string
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get(`/clinics/${id}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getDoctors(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/doctors');
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const postAnswersToChatGPT = async (data: {
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
