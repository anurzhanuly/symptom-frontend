import type { NewClinic, NewDoctor } from '../types/clinics';
import type { AxiosResponse } from 'axios';
import { useSymptomApi } from '@desktop/services/api';

export async function getClinics(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/clinics');
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function postNewClinic(
    newClinic: NewClinic
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post('/clinics/new', newClinic);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function postChangeClinic(
    id: string,
    newClinic: NewClinic
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(`/clinics/${id}/update`, newClinic);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function postChangeDoctor(
    id: string,
    newDoctor: NewDoctor
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post(`/doctors/${id}/update`, newDoctor);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function postNewDoctor(
    newDoctor: NewDoctor
): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.post('/doctors/new', newDoctor);
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

export async function getCities(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/cities');
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSpecializations(): Promise<AxiosResponse | null> {
    try {
        return await useSymptomApi.get('/specializations');
    } catch (error) {
        console.error(error);
        return null;
    }
}
