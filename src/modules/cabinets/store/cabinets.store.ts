import {
  getClientConsultations,
  getClientResult,
  getDoctorConsultations,
  getDoctorResult,
} from "../services/cabinets.refbooks";
import type { Consultation, ConsultationResult } from "../types/cabinets";
import type { DataTableFilterMeta } from "primevue/datatable";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCabinetsStore = defineStore("cabinet", () => {
  const myConsultation = ref<Consultation[]>([]);
  const consultationResult = ref<ConsultationResult>();
  const patientResult = ref<ConsultationResult>();
  const doctorResult = ref<ConsultationResult>();

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
      console.log("getClientConsultationsData  res:", res);
      myConsultation.value = res.data.included;
    }
    // else {
    //   router.push("/client-sign-in");
    // }
  }

  async function getDoctorResultData(Id: string): Promise<void> {
    const res = await getDoctorResult(Id);
    if (res) {
      consultationResult.value = res.data.included.filter((item: { type: string }) => item.type === "patient")[0];
      router.push("/doctor-cabinet/result");
    } else {
      router.push("/doctor-sign-in");
    }
  }

  async function getClientResultData(Id: string): Promise<void> {
    const res = await getClientResult(Id);

    if (res) {
      patientResult.value = res.data.included.filter((item: { type: string }) => item.type === "patient")[0];
      doctorResult.value = res.data.included.filter((item: { type: string }) => item.type === "doctor")[0];
    }
  }

  return {
    searchString,
    filters,
    myConsultation,
    consultationResult,
    getDoctorConsultationsData,
    getClientConsultationsData,
    getDoctorResultData,
    getClientResultData,
  };
});
