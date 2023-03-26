import type { AxiosError } from "axios";
import axios from "axios";

export const postAnswersToChatGPT = async (answers: { answers: Record<string, string[]> }): Promise<any> => {
  try {
    return await axios.post("http://www.symptom.kz:8080/recommendations", answers, {
      params: {
        key: "SymptomAlgaBas",
      },
    });
  } catch (error) {
    const err = error as AxiosError<Error>;
    console.log(error);
    return err;
  }
};
