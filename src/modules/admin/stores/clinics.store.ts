import type {
    City,
    Clinics,
    Doctors,
    NewClinic,
    NewDoctor,
    Specialization,
} from '../types/clinics';
import {
    getCities,
    getClinics,
    getDoctors,
    getSpecializations,
    postChangeClinic,
    postChangeDoctor,
    postNewClinic,
    postNewDoctor,
} from '../services/clinics.refbooks';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

export const useClinicsStore = defineStore('clinics', () => {
    const clinics = ref<Clinics[]>([]);
    const doctors = ref<Doctors[]>([]);
    const doctorsFIO = ref<any>([]);
    const cities = ref<City[]>([]);
    const specializations = ref<Specialization[]>([]);
    const selectedClinic = ref<Clinics>();
    const selectedDoctor = ref<Doctors>();

    onMounted(() => {
        // TODO: Переписать норм
        if (!clinics.value.length) {
            getClinicsData();
            getDoctorsData();
        }
    });

    async function getClinicsData(): Promise<void> {
        const res = await getClinics();
        if (res) {
            clinics.value = res.data.data;
        }
    }

    async function createClinicData(newClinic: NewClinic): Promise<number> {
        const res = await postNewClinic(newClinic);
        if (res) {
            clinics.value.push(res.data.data);
            return res.status;
        }

        return 0;
    }

    async function changeClinicData(
        id: string,
        newClinic: NewClinic
    ): Promise<number> {
        const res = await postChangeClinic(id, newClinic);
        if (res) {
            const index = clinics.value.findIndex((elem) => elem.id === id);
            clinics.value[index] = res.data;
            return res.status;
        }

        return 0;
    }

    async function changeDoctorData(
        id: string,
        newClinic: NewDoctor
    ): Promise<number> {
        const res = await postChangeDoctor(id, newClinic);
        if (res) {
            const index = clinics.value.findIndex((elem) => elem.id === id);
            doctors.value[index] = res.data;
            return res.status;
        }

        return 0;
    }

    async function getDoctorsData(): Promise<void> {
        const res = await getDoctors();
        if (res) {
            doctors.value = res.data.data;

            doctorsFIO.value = doctors.value.map((doctor) => ({
                id: doctor.id,
                name: `${doctor.attributes.firstName} ${doctor.attributes.lastName} ${doctor.attributes.midName}`,
            }));
        }
    }

    async function createDoctorData(newDoctor: NewDoctor): Promise<number> {
        const res = await postNewDoctor(newDoctor);
        if (res) {
            doctors.value.push(res.data.data);
            return res.status;
        }

        return 0;
    }

    async function getCitiesData(): Promise<void> {
        const res = await getCities();
        if (res) {
            cities.value = res.data.data;
        }
    }

    async function getSpecializationsData(): Promise<void> {
        const res = await getSpecializations();
        if (res) {
            specializations.value = res.data.data;
        }
    }

    return {
        cities,
        clinics,
        doctors,
        doctorsFIO,
        selectedClinic,
        selectedDoctor,
        specializations,
        changeClinicData,
        changeDoctorData,
        getCitiesData,
        createDoctorData,
        getSpecializationsData,
        createClinicData,
        getDoctorsData,
        getClinicsData,
    };
});
