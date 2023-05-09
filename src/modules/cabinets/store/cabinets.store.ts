import { getClientConsultations, getResult, getDoctorConsultations } from "../services/cabinets.refbooks";
import type { Consultation, ConsultationResult, PatientAnswers } from "../types/cabinets";
import type { DataTableFilterMeta } from "primevue/datatable";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { warn } from "@/utils/toast";
import { ref } from "vue";

export const useCabinetsStore = defineStore("cabinet", () => {
  const myConsultation = ref<Consultation[]>([]);
  const consultationResult = ref<ConsultationResult>();
  const patientResult = ref<ConsultationResult>();
  const doctorResult = ref<ConsultationResult>();
  const patientAnswer = ref<PatientAnswers>();
  const recommendations = ref<string[]>([]);

  const router = useRouter();

  const searchString = ref("");
  const filters = ref<DataTableFilterMeta>({
    global: { matchMode: "contains", value: searchString },
  });

  async function getDoctorConsultationsData(): Promise<void> {
    const res = await getDoctorConsultations();
    if (res) {
      myConsultation.value = res.data.included;
    } else {
      router.push("/doctor-sign-in");
    }
  }

  async function getClientConsultationsData(): Promise<void> {
    const res = await getClientConsultations();
    if (res) {
      myConsultation.value = res.data.included;
    } else {
      // router.push("/client-sign-in");
    }
  }

  async function getDoctorResultData(Id: string): Promise<void> {
    const res = await getResult(Id);
    if (res) {
      patientResult.value = res.data.included.filter((item: { type: string }) => item.type === "patient")[0];
      doctorResult.value = res.data.included.filter((item: { type: string }) => item.type === "doctor")[0];

      patientAnswer.value = res.data.data.attributes.patient_answers;
      recommendations.value = res.data.data.attributes.recommendations;

      router.push(`/doctor-cabinet/result/${Id}`);
    } else {
      warn("Не найдено", "Результаты не найдены");
      // router.push("/doctor-sign-in");
    }
  }

  async function getClientResultData(Id: string): Promise<void> {
    const res = await getResult(Id);
    if (res) {
      patientResult.value = res.data.included.filter((item: { type: string }) => item.type === "patient")[0];
      doctorResult.value = res.data.included.filter((item: { type: string }) => item.type === "doctor")[0];

      patientAnswer.value = res.data.data.attributes.patient_answers;
      recommendations.value = res.data.data.attributes.recommendations;

      router.push(`/client-cabinet/result/${Id}`);
    } else {
      warn("Не найдено", "Результаты не найдены");
    }
  }

  return {
    searchString,
    filters,
    myConsultation,
    consultationResult,
    patientResult,
    doctorResult,
    patientAnswer,
    recommendations,
    getDoctorConsultationsData,
    getClientConsultationsData,
    getDoctorResultData,
    getClientResultData,
  };
});
