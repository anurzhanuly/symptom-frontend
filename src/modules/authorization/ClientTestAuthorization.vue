<template>
    <authorization>
        <div class="authorization-client">
            <form class="authorization-form p-fluid">
                <img alt="Symptom logo" src="@/assets/logo-auth.png" />
                <div>
                    <h4>Имя <span>*</span></h4>
                    <input-text v-model="firstName" />
                </div>
                <div>
                    <h4>Фамилия <span>*</span></h4>
                    <input-text v-model="lastName" />
                </div>
                <div>
                    <h4>Отчество</h4>
                    <input-text v-model="middleName" />
                </div>
                <div>
                    <h4>Номер телефона</h4>
                    <input-text v-model="phone" />
                </div>
                <div v-show="!doctorLink">
                    <h4>Выберите клинику</h4>
                    <dropdown
                        v-model="сlinic"
                        :empty-message="'Ничего не найдено'"
                        filter
                        filter-placeholder="Поиск"
                        lazy
                        option-label="attributes.name"
                        option-value="id"
                        :options="clinics"
                        @change="getDoctors($event)"
                    />
                </div>
                <div v-show="!doctorLink">
                    <h4>Выберите врача</h4>
                    <dropdown
                        v-model="doctorId"
                        :empty-message="'Ничего не найдено'"
                        filter
                        filter-placeholder="Поиск"
                        lazy
                        option-label="name"
                        option-value="id"
                        :options="doctors"
                    />
                </div>
                <p-button
                    label="Далее"
                    :loading="isLoading"
                    @click="goToSurvey"
                />
            </form>
        </div>
    </authorization>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Authorization from './components/Authorization.vue';
import { useClinicsStore } from '@/modules/admin/stores/clinics.store';
import { useAuthorizationStore } from '@/modules/authorization/store/authorization.store';
import { useSurveyStore } from '@/modules/survey/store/survey.store';
import { warn } from '@/utils/toast';
import { getParameterByKey } from '@/utils/url';

import PButton from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const router = useRouter();
const clinicStore = useClinicsStore();
const authorizationStore = useAuthorizationStore();
const surveyStore = useSurveyStore();

const { isLoading, questions } = storeToRefs(surveyStore);
const { clinics } = storeToRefs(clinicStore);
const { doctors } = storeToRefs(authorizationStore);

const firstName = ref('');
const lastName = ref('');
const middleName = ref('');
const phone = ref('');
const сlinic = ref('');
const doctorId = ref('');
const doctorLink = ref(false);
const userRegisterData = ref<any>({}); // TODO: Сделать тип как будет авторизация

onMounted(() => {
    if (!questions.value) {
        surveyStore.getQuestionsData();
    }

    const id = getParameterByKey('doc');

    if (!id) return;

    doctorId.value = id;
    doctorLink.value = true;
});

const goToSurvey = (): void => {
    if (validateRegisterForm()) {
        router.push('survey');
    }
};

async function getDoctors(event: any) {
    const id = event.value;
    await authorizationStore.getDoctorsData(id);
}

const validateRegisterForm = (): boolean => {
    if (!firstName.value) {
        warn('Внимание', "Поле 'Имя' должно быть заполнено");
        return false;
    }

    if (!lastName.value) {
        warn('Внимание', "Поле 'Фамилия' должно быть заполнено");
        return false;
    }

    if (middleName.value) {
        middleName.value = middleName.value
            .trim()
            .split(' ')
            .map(
                (word: string) =>
                    word[0].toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    if (firstName.value) {
        firstName.value = firstName.value
            .trim()
            .split(' ')
            .map(
                (word: string) =>
                    word[0].toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    if (lastName.value) {
        lastName.value = lastName.value
            .trim()
            .split(' ')
            .map(
                (word: string) =>
                    word[0].toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    userRegisterData.value = {
        firstName: firstName.value,
        lastName: lastName.value,
        middleName: middleName.value,
        phone: phone.value,
        сlinic: сlinic.value,
        doctor: doctorId.value,
    };

    localStorage.setItem('doctorId', doctorId.value);

    return true;
};
</script>

<style scoped>
.authorization-client {
    padding: 50px;
}

.authorization-form span {
    color: #d0312d;
}

.authorization-form img {
    margin-bottom: 20px;
}

.authorization-form h4 {
    color: #3f3f3f;
    font-weight: 400;
    margin-top: 8px;
}

.authorization-form .p-inputtext,
.authorization-form .p-dropdown {
    margin-top: 8px;
    width: 100%;
}

.authorization-form .p-button {
    margin-top: 15px;
    height: 45px;
    font-weight: 600;
    border-radius: 5px;
    width: 100%;
}

@media only screen and (max-width: 750px) {
    .authorization-client {
        padding: 10%;
    }
}
</style>
