import { useSymptomApi } from '@desktop/services/api';
import type { AxiosResponse } from 'axios';

export async function postNpsRequest(
    data: object
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post('/nps/create', {
            data,
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}
