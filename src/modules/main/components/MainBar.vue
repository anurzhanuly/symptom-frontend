<template>
  <div class="main-container">
    <div class="main-information">
      <h1>Что Вас беспокоит?</h1>
      <h3>
        Пройдите опрос, узнайте о состоянии <br />
        вашего здоровья и начните приём <br />
        с нами
      </h3>
      <div v-if="isDoctor" class="main-container-button">
        <p-button label="Войти в кабинет врача" @click="$router.push('doctorSignin')" />
      </div>
      <div v-else class="main-container-buttons">
        <p-button label="Пройти опрос" @click="$router.push('agreement')" />
        <p-button label="Войти в личный кабинет" class="p-button-outlined" @click="$router.push('clientSignup')" />
      </div>
    </div>
    <div class="main-image">
      <img src="@/assets/main.png" alt="logo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useSurveyStore } from "../../survey/store/survey.store.js";
import { useMainStore } from "../store/main.store";

import PButton from "primevue/button";
import { storeToRefs } from "pinia";

const surveyStore = useSurveyStore();
const mainStore = useMainStore();

const { isDoctor } = storeToRefs(mainStore);

onMounted(() => {
  surveyStore.getQuestionsData();
});

const isMobileDevice = computed(() => /Mobi/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent));
console.log(isMobileDevice.value);
</script>

<style scoped>
.main-container {
  padding: 0 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90vh;
}

.main-information {
  width: 50%;
}

.main-image,
img {
  width: 100%;
}

.main-container h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0px;
  margin-top: 15px;
}

.main-container h1 {
  font-size: 45px;
  font-weight: 700;
  line-height: 61px;
  letter-spacing: 0px;
}

.main-container-buttons,
.main-container-button {
  display: flex;
  flex-direction: column;
}

.main-container-button .p-button,
.main-container-buttons .p-button {
  width: 365px;
  font-size: 22px;
  background: #276ef1;
  border-radius: 10px;
  margin-top: 20px;
}

.main-container-buttons .p-button:last-child {
  background-color: #ffffff;
}
</style>
