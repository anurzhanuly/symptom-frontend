import type { ClientRegistration } from '../types/authorization';
import type { AxiosResponse } from 'axios';
import { useSymptomApi } from '@mobile/services/api';

export async function postLogin(
    login: string,
    password: string
): Promise<AxiosResponse | null> {
    const bodyFormData = new FormData();
    bodyFormData.append('phone', login);
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
        console.log(error);
        throw error;
    }
}

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
