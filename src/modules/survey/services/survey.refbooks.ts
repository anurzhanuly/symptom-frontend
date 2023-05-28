import type { AxiosError } from 'axios';
import { useSymptomApi } from '@/services/api';

export const postAnswersToChatGPT = async (answers: {
    answers: Record<string, string[]>;
    patientId: string;
}): Promise<any> => {
    try {
        return await useSymptomApi.post(
            '/recommendations?key=SymptomAlgaBas',
            answers
        );
    } catch (error) {
        const err = error as AxiosError<Error>;
        console.log(error);
        return err;
    }
};
