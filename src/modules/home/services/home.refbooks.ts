import { useSymptomApi } from '@/services/api';
import type { AxiosResponse } from 'axios';

export async function postNpsRequest(
    request: object
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post('/nps/create', {
            request,
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}
