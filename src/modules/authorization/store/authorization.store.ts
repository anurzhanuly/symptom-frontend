import {
    clientRegistration,
    postLogin,
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

    async function postLoginDoctor(
        email: string,
        password: string
    ): Promise<void> {
        const res = await postLogin(email, password);
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
        email: string,
        password: string
    ): Promise<void> {
        const res = await postLogin(email, password);

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

    async function getDoctorsData(id: string): Promise<void> {
        const res = await getDoctors(id);

        if (res) {
            doctors.value = res.data.included
                ? res.data.included.map((doctor: Doctors) => ({
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
        getDoctorsData,
        doctors,
    };
});
