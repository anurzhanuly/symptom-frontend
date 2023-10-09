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
                    class="main__button"
                    @click="goToClientCabinet"
                >
                    Войти в личный кабинет
                </ui-button>
            </div>
        </div>
        <img
            class="main__img"
            alt="logo"
            src="@/assets/main.png"
        />
    </div>
</template>

<style scoped lang="scss">
.main {
    padding: 0 60px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    height: 90vh;

    @media (max-width: 500px) {
        padding: 0 10px;
    }

    &__title {
        font-size: $fz-huge;
        line-height: $lh-bigger;
    }

    &__subtitle {
        font-size: $fz-small;
        line-height: $lh-small;
        margin-top: 15px;
    }

    &__button-wrapper {
        margin-top: 8px;
    }

    &__button {
        margin-bottom: 12px;
        font-size: $fz-normal;
    }

    &__img {
        width: 100%;
    }
}
</style>
