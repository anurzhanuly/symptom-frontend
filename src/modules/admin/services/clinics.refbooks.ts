import type { NewClinic, NewDoctor } from "./../types/clinics";
import type { AxiosError, AxiosResponse } from "axios";
import { useSymptomApi } from "@/services/api";

export async function getClinics(): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.get("/clinics");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function postNewClinic(newClinic: NewClinic): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.post("/clinics/new", newClinic);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function postChangeClinic(id: string, newClinic: NewClinic): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.post(`/clinics/${id}/update`, newClinic);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function postChangeDoctor(id: string, newDoctor: NewDoctor): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.post(`/doctors/${id}/update`, newDoctor);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function postNewDoctor(newDoctor: NewDoctor): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.post("/doctors/new", newDoctor);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function getDoctors(): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.get("/doctors");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function getCities(): Promise<AxiosError | AxiosResponse> {
  try {
    return await useSymptomApi.get("/cities");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function getSpecializations(): Promise<AxiosError | AxiosResponse> {
  try {
    return await useSymptomApi.get("/specializations");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}
