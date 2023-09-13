import type { AxiosError } from 'axios';
import { useSymptomApi } from '@mobile/services/api';

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
