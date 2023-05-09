import { useSymptomApi } from "@/services/api";
import type { AxiosResponse } from "axios";

export async function getDoctorConsultations(): Promise<AxiosResponse | null> {
  try {
    return await useSymptomApi.get("/doctors/cabinet", {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("doctorToken")!),
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getClientConsultations(): Promise<AxiosResponse | null> {
  try {
    return await useSymptomApi.get("/patients/cabinet", {
      headers: {
        // "auth-token": JSON.parse(localStorage.getItem("clientToken")!),
        "auth-token": "110f54db172d0666b39a7bbab9eb419a22f50a82389ca2d9486d8ea5fdcc551c",
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getDoctorResult(Id: string): Promise<AxiosResponse | null> {
  try {
    return await useSymptomApi.get(`/results/${Id}`, {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("doctorToken")!),
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getClientResult(Id: string): Promise<AxiosResponse | null> {
  try {
    return await useSymptomApi.get(`/results/${Id}`);
  } catch (error) {
    console.error(error);
    return null;
  }
}
