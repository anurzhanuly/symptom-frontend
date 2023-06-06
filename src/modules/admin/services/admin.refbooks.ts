import type { Recommendation } from '../types/recommendations';
import type { AxiosResponse } from 'axios';
import { useSymptomApi } from '@/services/api';

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
            '/admin/recommendations/'
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRecommendationDetail(
    id: string
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get<any>(`/admin/recommendations/${id}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteRecommendation(
    id: string
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(`/admin/recommendations/${id}/delete`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createRecommendation(
    name: string
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post('/admin/recommendations/create', {
            data: {
                name: name,
                tests: {},
                conditions: [],
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateRecommendation(
    id: string,
    name: string,
    tests: any,
    conditions: any
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(`/admin/recommendations/${id}/update`, {
            data: {
                name: name,
                tests: tests,
                conditions: conditions,
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}
