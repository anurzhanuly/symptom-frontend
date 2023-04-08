import type { AxiosError, AxiosResponse } from "axios";
import { useSymptomApi } from "@/services/api";

export async function postLoginDoctor(email: string, password: string): Promise<AxiosResponse | AxiosError> {
  const bodyFormData = new FormData();
  bodyFormData.append("email", email);
  bodyFormData.append("password", password);

  try {
    return await useSymptomApi.post("/login", bodyFormData);
  } catch (error) {
    return error as AxiosError<Error>;
  }
}
