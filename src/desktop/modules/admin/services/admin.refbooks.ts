import type { Recommendation } from '../types/recommendations';
import type { AxiosResponse } from 'axios';
import { useSymptomApi } from '@desktop/services/api';
import type { UnwrapRef } from 'vue';

export async function getQuestionsJson(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/v1/questionnaires/latest');
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRecommendations(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get<Recommendation[]>(
            '/admin/recommendations/',
            {
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('admToken')!),
                },
            }
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getDiseases(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get<Recommendation[]>('/diseases/');
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getDiseasesQuestionsJson(
    id: string | undefined
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get<any>(`/diseases/${id}/questionnaires`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRecommendationDetailData(
    id: string | undefined
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get<any>(`/admin/recommendations/${id}`, {
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('admToken')!),
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteRecommendation(
    id: UnwrapRef<Recommendation['id']> | undefined
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(
            `/admin/recommendations/${id}/delete`,
            {},
            {
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('admToken')!),
                },
            }
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createRecommendation(
    name: string
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(
            '/admin/recommendations/create',
            {
                data: {
                    name: name,
                    tests: {},
                    conditions: [],
                },
            },
            {
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('admToken')!),
                },
            }
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateRecommendation(
    id: string | undefined,
    name: string | undefined,
    tests: any,
    conditions: any
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(
            `/admin/recommendations/${id}/update`,
            {
                data: {
                    name: name,
                    tests: tests,
                    conditions: conditions,
                },
            },
            {
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('admToken')!),
                },
            }
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}
