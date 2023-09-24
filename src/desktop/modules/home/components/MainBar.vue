<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHomeStore } from '../store/home.store';

import { storeToRefs } from 'pinia';
import UiButton from '@/ui/UiButton.vue';

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
</script>

<template>
    <div class="main">
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
                    is-big
                    is-full
                    is-blue
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
                    is-big
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
                    is-big
                    @click="goToClientCabinet"
                >
                    Войти в личный кабинет
                </ui-button>
            </div>
        </div>
        <div class="main__img-container">
            <img
                class="main__img"
                alt="logo"
                src="@/assets/main.png"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    padding: 0 190px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90vh;

    @media (max-width: 1200px) {
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 865px) {
        padding: 0 60px;
    }

    &__content-wrapper {
        width: 50%;

        @media (max-width: 1200px) {
            width: 100%;
        }
    }

    &__title {
        font-size: 48px;
        font-weight: 700;
        display: inline;

        @media (max-width: 1650px) {
            font-size: 36px;
        }

        @media (max-width: 1480px) {
            font-size: 30px;
        }

        @media (max-width: 1200px) {
            font-size: 37px;
        }
    }

    &__subtitle {
        font-size: 20px;
        line-height: 35px;
        margin-top: 15px;

        @media (max-width: 1650px) {
            font-size: 16px;
            line-height: 20px;
        }

        @media (max-width: 1200px) {
            font-size: 20px;
        }
    }

    &__button-wrapper {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
    }

    &__button {
        margin-bottom: 16px;
    }

    &__img-container {
        width: 100%;
    }

    &__img {
        width: 100%;
    }
}
</style>
