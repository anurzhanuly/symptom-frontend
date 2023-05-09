import { clientRegistration, postLogin } from "../services/authorization.refbooks";
import type { ClientRegistration } from "../types/authorization";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthorizationStore = defineStore("authorization", () => {
  const router = useRouter();
  const isWrong = ref(false);

  async function postLoginDoctor(email: string, password: string): Promise<void> {
    const res = await postLogin(email, password);
    if (res) {
      localStorage.setItem("doctorToken", JSON.stringify(res.data.data.token));
      router.push("/doctor-cabinet");
    } else {
      isWrong.value = true;
    }
  }

  async function postLoginClient(email: string, password: string): Promise<void> {
    const res = await postLogin(email, password);
    if (res) {
      localStorage.setItem("clientToken", JSON.stringify(res.data.data.token));
      router.push("/client-cabinet");
    } else {
      isWrong.value = true;
    }
  }

  async function clientRegistrationData(clientData: ClientRegistration) {
    const res = await clientRegistration(clientData);
    if (res) {
      return res.data.data.token;
    }
  }

  return {
    isWrong,
    postLoginDoctor,
    postLoginClient,
    clientRegistrationData,
  };
});
