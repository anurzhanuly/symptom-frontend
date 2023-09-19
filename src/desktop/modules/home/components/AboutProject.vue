<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

import UiButton from '@/ui/UiButton.vue';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);
const router = useRouter();

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

function direct(): void {
    if (isDoctor.value) {
        // TODO registration
    } else {
        router.push({ name: 'choose-survey-flow' });
    }
}
</script>

<template>
    <div
        id="test"
        class="about-page"
    >
        <div class="about">
            <div class="about__img">
                <img
                    alt="logo"
                    src="@/assets/onboarding/onboard2.png"
                />
            </div>
            <div class="about__info-block">
                <h3>О проекте</h3>
                <div class="about__text">
                    <h1>01</h1>
                    <p>{{ projectInfoFirst }}</p>
                </div>
                <div class="about__text">
                    <h1>02</h1>
                    <p>{{ projectInfoSecond }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="about-action">
        <h4>{{ actionInfo }}</h4>
        <div class="about-action__button">
            <ui-button
                is-big
                is-full
                is-blue
                @click="direct"
            >
                Пройти Опрос
            </ui-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about-page {
    background: #eef5fb;
}

.about {
    display: flex;
    padding: 20px 100px;

    &__img {
        width: 100%;

        img {
            width: 100%;
        }
        @media (max-width: 1200px) {
            display: none;
        }
    }

    &__info-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;

        h3 {
            font-weight: 600;
            font-size: 36px;
            line-height: 44px;
            color: #111111;
            margin-left: 75px;
        }
    }

    &__text {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;

        h1 {
            font-weight: 600;
            font-size: 60px;
            line-height: 60px;
            color: #276ef1;
            margin-right: 15px;

            @media (max-width: 1350px) {
                font-size: 50px;
            }
        }
        p {
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

.about-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 22vh;
    justify-content: space-evenly;
    background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);

    h4 {
        font-weight: 600;
        font-size: 36px;
        color: #212121;
    }

    &__button {
        width: 55%;
    }
}
</style>
