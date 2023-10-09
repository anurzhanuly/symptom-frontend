<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';
import { computed } from 'vue';

import UiButton from '@/ui/UiButton.vue';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);

const actionInfo = computed(() => {
    return isDoctor.value
        ? 'Оставьте заявку в Symptom уже сейчас'
        : 'Определить состояние здоровья уже сейчас';
});

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
    padding: $sp5 60px;
    background: $payed-blue;

    @media (max-width: 500px) {
        padding: $sp5;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    &__title {
        font-size: 36px;
        line-height: $lh-huge;
        color: $black;
        margin: 0;
        text-align: center;
    }

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: $sp6 0;

        @media (max-width: 500px) {
            flex-direction: column;
        }
    }

    &__subtitle {
        font-size: 32px;
        font-weight: 700;
        color: $blue-light;
        line-height: 0;
        margin-right: $sp4;
    }

    &__text {
        font-size: $fz-normal;
        line-height: $lh-small;
        color: $black;
        margin: 0;
    }
}
</style>
