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
        <div class="about__info-block">
            <h3 class="about__info-block__title">О проекте</h3>
            <div class="about__info-block__content">
                <h1 class="about__info-block__content__title">01</h1>
                <p class="about__info-block__content__text">
                    {{ projectInfoFirst }}
                </p>
            </div>
            <div class="about__info-block__content">
                <h1 class="about__info-block__content__title">02</h1>
                <p class="about__info-block__content__text">
                    {{ projectInfoSecond }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.about {
    display: flex;
    padding: 20px 100px;
    background: #eef5fb;

    &__img {
        max-width: 50%;
        max-height: 100%;

        @media (max-width: 1200px) {
            display: none;
        }
    }

    &__info-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;

        &__title {
            font-weight: 600;
            font-size: 36px;
            line-height: 44px;
            color: #111111;
            margin-left: 75px;

            @media (max-width: 1200px) {
                margin: 0;
                text-align: center;
            }
        }

        &__content {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;

            &__title {
                font-weight: 600;
                font-size: 60px;
                line-height: 60px;
                color: #276ef1;
                margin-right: 15px;

                @media (max-width: 1350px) {
                    font-size: 50px;
                }
            }

            &__text {
                font-weight: 400;
                font-size: 20px;
                line-height: 28px;
                color: #000000;

                @media (max-width: 1350px) {
                    font-size: 18px;
                }
            }
        }
    }
}
</style>
