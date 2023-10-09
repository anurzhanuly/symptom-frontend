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
    padding: 20px 60px;
    background: #eef5fb;

    @media (max-width: 500px) {
        padding: 20px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    &__title {
        font-size: 36px;
        line-height: $lh-huge;
        color: #111111;
        margin: 0;
        text-align: center;
    }

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;

        @media (max-width: 500px) {
            flex-direction: column;
        }
    }

    &__subtitle {
        font-size: 50px;
        color: #276ef1;
        margin-right: 15px;
    }

    &__text {
        font-size: $fz-small;
        line-height: $lh-small;
        color: #000000;
        margin: 0;
    }
}
</style>
