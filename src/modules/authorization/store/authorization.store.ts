import { postLoginDoctor } from "../services/authorization.refbooks";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthorizationStore = defineStore("authorization", () => {
  const router = useRouter();

  async function postLoginDoctorData(email: string, password: string): Promise<void> {
    const res = await postLoginDoctor(email, password);
    if (!axios.isAxiosError(res)) {
      localStorage.setItem("doctorToken", JSON.stringify(res.data.data.token));
    }

    if (JSON.parse(localStorage.getItem("doctorToken")!)) {
      router.push("/cabinet");
    }
  }

  return {
    postLoginDoctorData,
  };
});
