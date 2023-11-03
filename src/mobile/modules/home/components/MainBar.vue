<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';

import UiButton from '@/ui/UiButton.vue';

const router = useRouter();
const homeStore = useHomeStore();

const { isDoctor } = storeToRefs(homeStore);

const clientToken = ref('');
const doctorToken = ref('');

function goToClientCabinet() {
    clientToken.value = localStorage.getItem('clientToken') ?? '';
    const tokenDate = Number(localStorage.getItem('tokenDate')) ?? '';
    const prepareDate = 8 * 60 * 60 * 1000;
    const currentDate = Date.now();
    const timeDiff = currentDate - tokenDate;

    if (clientToken.value && tokenDate) {
        if (timeDiff < prepareDate) {
            router.push('/client-cabinet');

            return;
        }
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
</script>

<template>
    <div class="main">
        <img
            class="main__img"
            alt="logo"
            src="@/assets/main.png"
        />
        <div class="main__content-wrapper">
            <h1 class="main__title">Что Вас беспокоит?</h1>
            <h3 class="main__subtitle">
                Пройдите опрос, узнайте о состоянии вашего здоровья и начните
                приём с нами
            </h3>
            <div
                v-if="isDoctor"
                class="main__button-wrapper"
            >
                <ui-button
                    v-if="!doctorToken"
                    is-full
                    is-blue
                    class="main__button"
                    @click="goToDoctorCabinet"
                >
                    Войти в кабинет врача
                </ui-button>
            </div>
            <div
                v-else
                class="main__button-wrapper"
            >
                <ui-button
                    is-full
                    is-blue
                    class="main__button"
                    @click="$router.push({ name: 'choose-survey-flow' })"
                >
                    Пройти Опрос
                </ui-button>
                <ui-button
                    v-if="!clientToken"
                    is-full
                    is-white
                    class="main__button"
                    @click="goToClientCabinet"
                >
                    Войти в личный кабинет
                </ui-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    height: 90vh;
    padding: 0 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width: 500px) {
        padding: 0 $sp3;
    }

    &__title {
        font-size: $fz-huge;
        font-weight: 600;
        line-height: $lh-bigger;
        margin: $sp6 0;
    }

    &__subtitle {
        font-size: $fz-normal;
        line-height: $lh-base;
        margin: $sp6 0;
    }

    &__button-wrapper {
        margin-top: $sp6;
        margin-bottom: $sp6;
    }

    &__button {
        font-size: $fz-normal;
    }

    &__button:not(:last-child) {
        margin-bottom: $sp4;
    }

    &__img {
        width: 100%;
        margin: $sp6 0;
    }
}
</style>
