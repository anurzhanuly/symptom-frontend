import { useSymptomApi } from "@/services/api";
import type { AxiosResponse } from "axios";

export const getDoctorsConsultations = async (): Promise<AxiosResponse | null> => {
  try {
    return await useSymptomApi.get("/doctors/cabinet", {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("doctorToken")!),
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getResult = async (Id: string): Promise<AxiosResponse | null> => {
  try {
    return await useSymptomApi.get(`/results/${Id}`, {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("doctorToken")!),
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
