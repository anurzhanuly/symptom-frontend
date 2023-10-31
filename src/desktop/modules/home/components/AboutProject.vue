<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';
import { computed } from 'vue';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);

const projectInfoFirst = computed(() => {
    return isDoctor.value
        ? 'С помощью опросника, работающего на базе искусственного интеллекта, Symptom собирает структурированную историю болезни'
        : 'С помощью опросника, работающего на базе искусственного интеллекта, Symptom собирает структурированную историю болезни и формирует рекомендации по необходимым обследованиям и анализам';
});

const projectInfoSecond = computed(() => {
    return isDoctor.value
        ? 'С помощью опросника, работающего на базе искусственного интеллекта, Symptom собирает структурированную историю болезни'
        : 'Опросник состоит из вопросов, составленных профессиональными врачами. Его заполнение опросника занимает от 5 до 15 минут в зависимости от вашего состояния.';
});
</script>

<template>
    <div class="about">
        <img
            class="about__img"
            alt="logo"
            src="@/assets/onboarding/onboard2.png"
        />
        <div class="about__wrapper">
            <h3 class="about__title">О проекте</h3>
            <div class="about__content">
                <p class="about__subtitle">01</p>
                <p class="about__text">
                    {{ projectInfoFirst }}
                </p>
            </div>
            <div class="about__content">
                <p class="about__subtitle">02</p>
                <p class="about__text">
                    {{ projectInfoSecond }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.about {
    display: flex;
    padding: $sp5 100px;
    background: $payed-blue;

    &__img {
        max-width: 50%;
        max-height: 100%;

        @media (max-width: 1200px) {
            display: none;
        }
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    &__title {
        font-size: $fz-max;
        line-height: $lh-huge;
        color: $black;
        margin-left: 75px;

        @media (max-width: 1200px) {
            margin: 0;
            text-align: center;
        }
    }

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: $sp6;
    }

    &__subtitle {
        font-size: 40px;
        line-height: $lh-huge;
        color: $blue-darker;
        margin-right: $sp4;
    }

    &__text {
        font-size: $fz-bigger;
        line-height: $lh-big;
        color: $black;

        @media (max-width: 1350px) {
            font-size: $fz-big;
        }
    }
}
</style>
