import { useSymptomApi } from "@/services/api";
import type { AxiosResponse, AxiosError } from "axios";

export const getDoctorsConsultations = async (): Promise<AxiosResponse | AxiosError> => {
  try {
    return await useSymptomApi.get("/doctors/cabinet", {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("doctorToken")!),
      },
    });
  } catch (error) {
    const err = error as AxiosError<Error>;
    console.log(error);
    return err;
  }
};

export const getResult = async (Id: string): Promise<AxiosResponse | AxiosError> => {
  try {
    return await useSymptomApi.get(`/results/${Id}`, {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("doctorToken")!),
      },
    });
  } catch (error) {
    const err = error as AxiosError<Error>;
    console.log(error);
    return err;
  }
};
