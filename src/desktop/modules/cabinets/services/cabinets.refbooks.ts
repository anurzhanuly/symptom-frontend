import { useSymptomApi } from '@/services/api';
import type { AxiosResponse } from 'axios';

export async function getDoctorConsultations(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/doctors/cabinet', {
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('doctorToken')!),
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
                'auth-token': JSON.parse(localStorage.getItem('clientToken')!),
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
                        localStorage.getItem('doctorToken')!
                    ),
                },
            }
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}
