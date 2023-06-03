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
                    <h4>Номер телефона <span>*</span></h4>
                    <input-text v-model="phone" />
                </div>
                <div>
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
                        @change="getDoctors($event.value)"
                    />
                </div>
                <div>
                    <h4>Выберите врача</h4>
                    <dropdown
                        v-model="doctor"
                        :empty-message="'Ничего не найдено'"
                        filter
                        filter-placeholder="Поиск"
                        lazy
                        option-label="name"
                        option-value="id"
                        :options="doctors"
                    />
                </div>
                <p-button label="Далее" @click="goToSurvey" />
            </form>
        </div>
    </authorization>
</template>

<script setup lang="ts">
import Authorization from './components/Authorization.vue';
import { useClinicsStore } from '@/modules/admin/stores/clinics.store';
import { useAuthorizationStore } from '@/modules/authorization/store/authorization.store';
import { useRouter } from 'vue-router';
import { warn } from '@/utils/toast';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import PButton from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const router = useRouter();
const clinicStore = useClinicsStore();
const authorizationStore = useAuthorizationStore();

const { clinics } = storeToRefs(clinicStore);
const { doctors } = storeToRefs(authorizationStore);

const firstName = ref('');
const lastName = ref('');
const middleName = ref('');
const phone = ref('');
const сlinic = ref('');
const doctor = ref('');
const userRegisterData = ref<any>({}); // TODO: Сделать тип как будет авторизация

const goToSurvey = (): void => {
    if (validateRegisterForm()) {
        router.push('agreement');
    }
};

async function getDoctors(id: string) {
    await authorizationStore.getDoctorsData(id);
}

const validateRegisterForm = (): boolean => {
    const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    const phonePattern = /^8[0-9]{10}$/;

    if (!firstName.value) {
        warn('Внимание', "Поле 'Имя' должно быть заполнено");
        return false;
    }

    if (firstName.value.length > 2 && !cyrillicPattern.test(firstName.value)) {
        warn(
            'Внимание',
            "Поле 'Имя' должно быть на кириллице и больше 2 символов"
        );
        return false;
    }

    if (!lastName.value) {
        warn('Внимание', "Поле 'Фамилия' должно быть заполнено");
        return false;
    }

    if (lastName.value.length > 2 && !cyrillicPattern.test(lastName.value)) {
        warn(
            'Внимание',
            "Поле 'Фамилия' должно быть на кириллице и больше 2 символов"
        );
        return false;
    }

    if (!phonePattern.test(phone.value)) {
        warn(
            'Внимание',
            "Поле 'Номер телефона' должен начинаеться с 8 и иметь 11 символов"
        );
        return false;
    }

    if (middleName.value) {
        middleName.value = middleName.value
            .split(' ')
            .map(
                (word: string) =>
                    word[0].toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    firstName.value = firstName.value
        .split(' ')
        .map(
            (word: string) =>
                word[0].toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');

    lastName.value = lastName.value
        .split(' ')
        .map(
            (word: string) =>
                word[0].toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');

    userRegisterData.value = {
        firstName: firstName.value,
        lastName: lastName.value,
        middleName: middleName.value,
        phone: phone.value,
        сlinic: сlinic.value,
        doctor: doctor.value,
    };

    if (doctor.value) {
        localStorage.setItem('doctorId', doctor.value);
    }

    return true;
};
</script>

<style scoped>
.authorization-client {
    padding: 17%;
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
