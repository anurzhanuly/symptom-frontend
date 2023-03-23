import { useSymptomApi } from "@/services/api";
import type { AxiosError, AxiosResponse } from "axios";

export const postLogin = async (email: string, password: string): Promise<AxiosResponse | AxiosError> => {
  const bodyFormData = new FormData();
  bodyFormData.append("email", email);
  bodyFormData.append("password", password);

  try {
    return await useSymptomApi.post("/login", bodyFormData);
  } catch (error) {
    const err = error as AxiosError<Error>;
    console.log(error);
    return err;
  }
};
