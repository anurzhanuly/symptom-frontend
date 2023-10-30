import {
    clientRegistration,
    postLogin,
    getClinicDoctors,
    getDoctors,
} from '../services/authorization.refbooks';
import type { ClientRegistration, Doctors } from '../types/authorization';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthorizationStore = defineStore('authorization', () => {
    const router = useRouter();
    const isWrong = ref(false);
    const doctors = ref<{ id: string; name: string }[]>([]);
    const isRegistrationComplete = ref(false);
    const phoneNumber = ref('');

    async function postLoginDoctor(
        login: string,
        password: string
    ): Promise<void> {
        const res = await postLogin(login, password);
        if (res) {
            localStorage.setItem(
                'doctorToken',
                JSON.stringify(res.data.data.token)
            );
            router.push('/doctor-cabinet');
        } else {
            isWrong.value = true;
        }
    }

    async function postLoginClient(
        login: string,
        password: string
    ): Promise<void> {
        const res = await postLogin(login, password);

        if (res) {
            localStorage.setItem(
                'clientToken',
                JSON.stringify(res.data.data.token)
            );

            router.push('/client-cabinet');
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

    async function getClinicDoctorsData(id: string): Promise<void> {
        const res = await getClinicDoctors(id);

        if (res) {
            doctors.value = res.data.included
                ? res.data.included.map((doctor: Doctors) => ({
                      id: doctor.id,
                      name: `${doctor.attributes.firstName} ${doctor.attributes.lastName} ${doctor.attributes.midName}`,
                  }))
                : [];
        }
    }

    async function getDoctorsData(): Promise<void> {
        const res = await getDoctors();

        if (res) {
            doctors.value = res.data.data
                ? res.data.data.map((doctor: Doctors) => ({
                      id: doctor.id,
                      name: `${doctor.attributes.firstName} ${doctor.attributes.lastName} ${doctor.attributes.midName}`,
                  }))
                : [];
        }
    }

    return {
        isWrong,
        postLoginDoctor,
        postLoginClient,
        clientRegistrationData,
        getClinicDoctorsData,
        getDoctorsData,
        doctors,
        isRegistrationComplete,
        phoneNumber,
    };
});
