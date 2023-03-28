import type { ResQuestions } from "@/modules/admin/types/questions";
import { useSymptomApi } from "@/services/api";
import type { AxiosError, AxiosResponse } from "axios";

export const changeQuestionsJson = async (questions: ResQuestions): Promise<AxiosError | AxiosResponse> => {
  try {
    const res = useSymptomApi.post("/questionnaires/new", questions);

    return res;
  } catch (error) {
    const err = error as AxiosError<Error>;
    console.log(error);
    return err;
  }
};
