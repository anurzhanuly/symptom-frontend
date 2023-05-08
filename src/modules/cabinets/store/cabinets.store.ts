import { getDoctorsConsultations, getResult } from "../services/cabinets.refbooks";
import type { Consultation, ConsultationResult } from "../types/cabinets";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCabinetsStore = defineStore("cabinet", () => {
  const myConsultation = ref<Consultation[]>([]);
  const consultationResult = ref<ConsultationResult>();
  const router = useRouter();

  async function getDoctorsConsultationsData(): Promise<void> {
    const res = await getDoctorsConsultations();
    if (res) {
      myConsultation.value = res.data.included;
    } else {
      router.push("/doctor-sign-in");
    }
  }

  async function getResultData(Id: string): Promise<void> {
    const res = await getResult(Id);
    if (res) {
      consultationResult.value = res.data.included.filter((item: { type: string }) => item.type === "patient")[0];
      router.push("/doctor-cabinet/result");
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
