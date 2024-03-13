import { useSymptomApi } from '@desktop/services/api';
import type { AxiosResponse } from 'axios';
import { CLIENT_TOKEN, DOCTOR_TOKEN } from '@/utils/localStorageKeys';

export async function getDoctorConsultations(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/doctors/cabinet', {
            headers: {
                'auth-token': JSON.parse(localStorage.getItem(DOCTOR_TOKEN)!),
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getClientConsultations(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/patients/cabinet', {
            headers: {
                'auth-token': JSON.parse(localStorage.getItem(CLIENT_TOKEN)!),
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getClientDiseasesConsultations(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/patients/monitoring', {
            headers: {
                'auth-token': JSON.parse(localStorage.getItem(CLIENT_TOKEN)!),
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getResult(Id: string): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get(`/results/${Id}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getDiseaseResult(
    Id: string
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get(`/patients/monitoring/${Id}`, {
            headers: {
                'auth-token': JSON.parse(CLIENT_TOKEN!),
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function postPassword(
    password: string
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(
            '/users/update',
            {
                password,
            },
            {
                headers: {
                    'auth-token': JSON.parse(
                        localStorage.getItem(DOCTOR_TOKEN)!
                    ),
                },
            }
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}
