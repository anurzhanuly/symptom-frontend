import {
    getClientConsultations,
    getDoctorConsultations,
    getResult,
    getDiseaseResult,
    getClientDiseasesConsultations,
} from '../services/cabinets.refbooks';
import type {
    Consultation,
    ConsultationResult,
    PatientAnswers,
    DiseaseData,
} from '../types/cabinets';
import type { DataTableFilterMeta } from 'primevue/datatable';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { error, warn } from '@/utils/toast';
import { ref } from 'vue';

export const useCabinetsStore = defineStore('cabinet', () => {
    const myConsultation = ref<Consultation[]>([]);
    const diseaseConsultation = ref<DiseaseData[]>([]);
    const consultationResult = ref<ConsultationResult>();
    const patientResult = ref<ConsultationResult>();
    const doctorResult = ref<ConsultationResult>();
    const patientAnswer = ref<PatientAnswers>();
    const patientCard = ref();
    const recommendations = ref<any>([]); //TODO POPRAVIT

    const router = useRouter();

    const searchString = ref('');
    const filters = ref<DataTableFilterMeta>({
        global: { matchMode: 'contains', value: searchString },
    });

    async function getDoctorConsultationsData(): Promise<void> {
        const res = await getDoctorConsultations();

        if (res) {
            myConsultation.value = res.data.included ?? [];
            localStorage.setItem('doctorId', res.data.data.id);
        } else {
            error('Ошибка', 'Попробуйте снова');
            router.push('/doctor-sign-in');
        }
    }

    async function getClientConsultationsData(): Promise<void> {
        const res = await getClientConsultations();

        if (res) {
            myConsultation.value = res.data.included ?? [];
            localStorage.setItem('patientId', res.data.data.id);
        } else {
            error('Ошибка', 'Попробуйте снова');
            router.push('/client-sign-in');
        }
    }

    async function getClientDiseasesConsultationsData(): Promise<void> {
        const res = await getClientDiseasesConsultations();

        if (res) {
            diseaseConsultation.value = res.data.data ?? [];
            localStorage.setItem('patientId', res.data.data.id);
        } else {
            error('Ошибка', 'Попробуйте снова');
            router.push('/client-sign-in');
        }
    }

    async function getDoctorResultData(Id: string): Promise<void> {
        const res = await getResult(Id);

        if (res) {
            patientResult.value = res.data.included.filter(
                (item: { type: string }) => item.type === 'patient'
            )[0];
            doctorResult.value = res.data.included.filter(
                (item: { type: string }) => item.type === 'doctor'
            )[0];

            patientAnswer.value = res.data.data.attributes.patient_answers;
            patientCard.value = res.data.data.attributes.patient_card;
            recommendations.value = res.data.data.attributes.recommendations;

            router.push(`/doctor-cabinet/result/${Id}`);
        } else {
            warn('Не найдено', 'Результаты не найдены');
        }
    }

    async function getClientResultData(Id: string): Promise<boolean> {
        const res = await getResult(Id);

        if (res) {
            patientResult.value = res.data.included.filter(
                (item: { type: string }) => item.type === 'patient'
            )[0];
            doctorResult.value = res.data.included.filter(
                (item: { type: string }) => item.type === 'doctor'
            )[0];

            patientAnswer.value = res.data.data.attributes.patient_answers;
            patientCard.value = res.data.data.attributes.patient_card;
            recommendations.value = res.data.data.attributes.recommendations;

            return true;
        }

        return false;
    }

    async function getDiseaseResultData(Id: string): Promise<boolean> {
        const res = await getDiseaseResult(Id);

        if (res) {
            recommendations.value = res.data;

            return true;
        }

        return false;
    }

    return {
        searchString,
        filters,
        myConsultation,
        diseaseConsultation,
        consultationResult,
        patientResult,
        doctorResult,
        patientAnswer,
        patientCard,
        recommendations,
        getDoctorConsultationsData,
        getClientConsultationsData,
        getClientDiseasesConsultationsData,
        getDoctorResultData,
        getClientResultData,
        getDiseaseResultData,
    };
});
