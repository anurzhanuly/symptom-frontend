<template>
    <div class="main-container">
        <div class="main-information">
            <h1>Что Вас беспокоит?</h1>
            <h3>
                Пройдите опрос, узнайте о состоянии вашего здоровья и начните
                приём с нами
            </h3>
            <div v-if="isDoctor" class="main-container-button">
                <p-button
                    v-if="!doctorToken"
                    label="Войти в кабинет врача"
                    @click="goToDoctorCabinet"
                />
            </div>
            <div v-else class="main-container-buttons">
                <p-button
                    label="Пройти опрос"
                    @click="$router.push('choose-survey-flow')"
                />
                <p-button
                    v-if="!clientToken"
                    class="p-button-outlined"
                    label="Войти в личный кабинет"
                    @click="goToClientCabinet"
                />
            </div>
        </div>
        <div class="main-image">
            <img alt="logo" src="@/assets/main.png" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHomeStore } from '../store/home.store.js';

import PButton from 'primevue/button';
import { storeToRefs } from 'pinia';

const router = useRouter();
const homeStore = useHomeStore();

const { isDoctor } = storeToRefs(homeStore);

const clientToken = ref('');
const doctorToken = ref('');

function goToClientCabinet() {
    clientToken.value = localStorage.getItem('clientToken') ?? '';

    if (clientToken.value) {
        router.push('/client-cabinet');

        return;
    }
    router.push('/client-sign-in');
}

function goToDoctorCabinet() {
    doctorToken.value = localStorage.getItem('doctorToken') ?? '';

    if (doctorToken.value) {
        router.push('/doctor-cabinet');

        return;
    }
    router.push('/doctor-sign-in');
}

const isMobileDevice = computed(
    () => /Mobi/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent)
);
</script>

<style scoped>
.main-container {
    padding: 0 190px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90vh;
}

.main-information {
    width: 50%;
}

.main-image,
img {
    width: 100%;
}

h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 35px;
    margin-top: 15px;
}

h1 {
    font-size: 48px;
    font-weight: 700;
}

.main-container-buttons,
.main-container-button {
    display: flex;
    flex-direction: column;
}

.main-container-button .p-button,
.main-container-buttons .p-button {
    width: 365px;
    font-size: 22px;
    background: #276ef1;
    border-radius: 10px;
    margin-top: 20px;
}

.main-container-buttons .p-button:last-child {
    background-color: #ffffff;
}

@media (max-width: 1900px) {
    h1 {
        font-size: 45px;
    }
}

@media (max-width: 1800px) {
    h1 {
        font-size: 40px;
    }

    h3 {
        font-size: 18px;
    }
}

@media (max-width: 1650px) {
    h1 {
        font-size: 35px;
    }

    h3 {
        font-size: 16px;
        line-height: 25px;
    }

    .main-container-button .p-button,
    .main-container-buttons .p-button {
        width: 290px;
        font-size: 18px;
    }
}

@media (max-width: 1480px) {
    h1 {
        font-size: 30px;
    }
}

@media (max-width: 1350px) {
    h1 {
        font-size: 25px;
    }

    h3 {
        font-size: 14px;
        line-height: 20px;
    }

    .main-container-button .p-button,
    .main-container-buttons .p-button {
        width: 265px;
        font-size: 16px;
    }
}

@media (max-width: 1200px) {
    .main-container {
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    .main-information {
        width: 100%;
    }

    h1 {
        font-size: 37px;
    }

    h3 {
        font-size: 17px;
    }

    .main-container-button .p-button,
    .main-container-buttons .p-button {
        width: 385px;
    }
}

@media (max-width: 865px) {
    .main-container {
        padding: 0 60px;
    }
}

@media (max-width: 595px) {
    .main-information {
        width: 83%;
    }
}

@media (max-width: 490px) {
    .main-container {
        padding: 0 10px;
    }
}

@media (max-width: 430px) {
    .main-information {
        width: 95%;
    }
}

@media (max-width: 400px) {
    .main-container-button .p-button,
    .main-container-buttons .p-button {
        width: 100%;
    }
}
</style>
