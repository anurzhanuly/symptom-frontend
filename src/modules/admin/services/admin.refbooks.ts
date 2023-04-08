import type { Recommendation, ResRecommendation } from "../types/recommendations";
import type { ResQuestions } from "../types/questions";
import { useApi, useSymptomApi } from "@/services/api";
import type { Error } from "@/types/response";
import type { AxiosError } from "axios";

export async function getQuestionsJson(): Promise<any> {
  try {
    return await useSymptomApi.get<ResQuestions>("/questionnaires/latest");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function postQuestionsJson(questions: ResQuestions) {
  try {
    return await useApi.post("/questionnaires/add", questions);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function getRecommendationsJson() {
  try {
    return await useApi.get<ResRecommendation>("/admin/v1/recommendations");
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function putRecommendationsObj(newRec: Recommendation) {
  try {
    return await useApi.post("/admin/v1/diseases/add", newRec);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}

export async function deleteDisease(deleteRec: Recommendation) {
  try {
    return await useApi.post<ResRecommendation>("/admin/v1/diseases/delete", deleteRec);
  } catch (error) {
    console.log(error);
    return error as AxiosError<Error>;
  }
}
