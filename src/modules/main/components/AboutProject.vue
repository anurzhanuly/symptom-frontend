<template>
  <div class="about">
    <div class="about-container">
      <div class="image">
        <img src="@/assets/onboard2.png" alt="logo" />
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
    <p-button :label="buttonLabel" @click="direct" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../store/main.store";
import { useRouter } from "vue-router";
import { computed } from "vue";

import PButton from "primevue/button";

const mainStore = useMainStore();
const { isDoctor } = storeToRefs(mainStore);
const router = useRouter();

const actionInfo = computed(() => {
  return isDoctor.value ? "Оставьте заявку в Symptom уже сейчас" : "Определить состояние здоровья уже сейчас";
});

const buttonLabel = computed(() => {
  return isDoctor.value ? "Оставить заявку" : "Пройти опрос";
});

const projectInfoFirst = computed(() => {
  return isDoctor.value
    ? "С помощью опросника, работающего на базе искусственного интеллекта, Symptom собирает структурированную историю болезни"
    : "С помощью опросника, работающего на базе искусственного интеллекта, Symptom собирает структурированную историю болезни и формирует рекомендации по необходимым обследованиям и анализам";
});

const projectInfoSecond = computed(() => {
  return isDoctor.value
    ? "С помощью опросника, работающего на базе искусственного интеллекта, Symptom собирает структурированную историю болезни"
    : "Опросник состоит из вопросов, составленных профессиональными врачами. Его заполнение опросника занимает от 5 до 15 минут в зависимости от вашего состояния.";
});

function direct(): void {
  if (isDoctor.value) {
    console.log("TODO registration");
  } else {
    router.push("/agreement");
  }
}
</script>

<style scoped>
h4 {
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
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
  width: 650px;
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
</style>
