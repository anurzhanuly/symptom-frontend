import type { Recommendation } from "../types/recommendations";
import type { ResQuestions } from "../types/questions";
import type { Error } from "@/types/response";
import type { AxiosError, AxiosResponse } from "axios";
import { useSymptomApi } from "@/services/api";

export async function getQuestionsJson(): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.get<ResQuestions>("/questionnaires/latest");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function getRecommendations(): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.get<Recommendation[]>("/admin/recommendations/");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function getRecommendationDetail(id: string): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.get<any>(`/admin/recommendations/${id}`);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function deleteRecommendation(id: string): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.post(`/admin/recommendations/${id}/delete`);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function createRecommendation(name: string): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.post(`/admin/recommendations/create`, {
      data: {
        name: name,
        tests: {},
        conditions: [],
      },
    });
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function updateRecommendation(
  id: string,
  name: string,
  tests: any,
  conditions: any,
): Promise<AxiosResponse | AxiosError> {
  try {
    return await useSymptomApi.post(`/admin/recommendations/${id}/update`, {
      data: {
        name: name,
        tests: tests,
        conditions: conditions,
      },
    });
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}
