import type { ClientRegistration } from '../types/authorization';
import type { AxiosResponse } from 'axios';
import { useSymptomApi } from '@/services/api';

export async function postLogin(
    email: string,
    password: string
): Promise<AxiosResponse | null> {
    const bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);

    try {
        return await useSymptomApi.post('/login', bodyFormData);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function clientRegistration(clientData: ClientRegistration) {
    const bodyFormData = new FormData();
    bodyFormData.append('email', clientData.email);
    bodyFormData.append('password', clientData.password);
    bodyFormData.append('c_password', clientData.c_password);
    bodyFormData.append('type', clientData.type);
    bodyFormData.append('first_name', clientData.first_name);
    bodyFormData.append('last_name', clientData.last_name);
    bodyFormData.append('phone', clientData.phone);

    try {
        return await useSymptomApi.post('/register', bodyFormData);
    } catch (error) {
        console.error(error);
        return null;
    }
}
