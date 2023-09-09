<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

import PButton from 'primevue/button';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);
const router = useRouter();

const actionInfo = computed(() => {
    return isDoctor.value
        ? 'Оставьте заявку в Symptom уже сейчас'
        : 'Определить состояние здоровья уже сейчас';
});

const buttonLabel = computed(() => {
    return isDoctor.value ? 'Оставить заявку' : 'Пройти опрос';
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
        class="about"
    >
        <div class="about-container">
            <div class="image">
                <img
                    alt="logo"
                    src="@/assets/onboarding/onboard2.png"
                />
            </div>
            <div class="info">
                <h3>О проекте</h3>
                <div>
                    <div class="project-info">
                        <h1>01</h1>
                        <p>{{ projectInfoFirst }}</p>
                    </div>
                    <div class="project-info">
                        <h1>02</h1>
                        <p>{{ projectInfoSecond }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="about-action">
        <h4>{{ actionInfo }}</h4>
        <p-button
            :label="buttonLabel"
            @click="direct"
        />
    </div>
</template>

<style scoped>
h4 {
    font-weight: 600;
    font-size: 36px;
    color: #212121;
}

h3 {
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    color: #111111;
    margin-left: 75px;
}

h1 {
    font-weight: 600;
    font-size: 60px;
    line-height: 60px;
    color: #276ef1;
    margin-right: 15px;
}

p {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: #000000;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.project-info {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.about {
    background: #eef5fb;
}

.about-container {
    display: flex;
    padding: 20px 100px;
}

.image,
img {
    width: 100%;
}

.about-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 22vh;
    justify-content: space-evenly;
    background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);
}

.p-button {
    width: 390px;
    font-size: 22px;
    background: #276ef1;
    border-radius: 10px;
}

@media (max-width: 1350px) {
    h1 {
        font-size: 50px;
    }

    p {
        font-size: 18px;
    }

    .p-button {
        width: 265px;
        font-size: 16px;
    }
}

@media (max-width: 1200px) {
    .image {
        display: none;
    }
}

@media (max-width: 865px) {
    h4 {
        font-size: 25px;
    }
}

@media (max-width: 595px) {
    h4 {
        font-size: 20px;
    }

    h3 {
        font-size: 30px;
        margin-left: 55px;
    }

    h1 {
        font-size: 40px;
    }

    p {
        font-size: 16px;
    }

    .project-info {
        margin-top: 5px;
    }

    .about-container {
        padding: 20px 45px;
    }
}

@media (max-width: 490px) {
    .about-container {
        padding: 20px;
    }

    h4 {
        font-size: 15px;
    }

    h3 {
        font-size: 22px;
    }
}

@media (max-width: 400px) {
    h4 {
        font-size: 14px;
    }
}

@media (max-width: 330px) {
    h4 {
        font-size: 13px;
    }

    p {
        font-size: 14px;
    }
}
</style>
