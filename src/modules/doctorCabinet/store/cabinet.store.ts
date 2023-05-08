import { getDoctorsConsultations, getResult } from "../services/cabinet.refbooks";
import type { Consultation, ConsultationResult } from "../types/doctorCabinet";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export const useCabinetStore = defineStore("cabinet", () => {
  const myConsultation = ref<Consultation[]>([]);
  const consultationResult = ref<ConsultationResult>();
  const router = useRouter();

  async function getDoctorsConsultationsData(): Promise<void> {
    const res = await getDoctorsConsultations();
    console.log("getDoctorsConsultationsData  res:", res);
    if (!axios.isAxiosError(res)) {
      myConsultation.value = res.data.included;
    } else {
      router.push("/doctor-sign-in");
    }
  }

  async function getResultData(Id: string): Promise<void> {
    const res = await getResult(Id);
    if (!axios.isAxiosError(res)) {
      consultationResult.value = res.data.included.filter((item: { type: string }) => item.type === "patient")[0];
      router.push("/cabinet/result");
    } else {
      router.push("/doctor-sign-in");
    }
  }

  return {
    myConsultation,
    consultationResult,
    getDoctorsConsultationsData,
    getResultData,
  };
});
