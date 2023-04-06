<template>
  <div class="main-container">
    <div class="main-information">
      <h1>Что Вас беспокоит?</h1>
      <h3>Пройдите опрос, узнайте о состоянии вашего здоровья и начните приём с нами</h3>
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

h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 35px;
  margin-top: 15px;
}

h1 {
  font-size: 48px;
  font-weight: 700;
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

@media (max-width: 1900px) {
  h1 {
    font-size: 45px;
  }
}

@media (max-width: 1800px) {
  h1 {
    font-size: 40px;
  }

  h3 {
    font-size: 18px;
  }
}

@media (max-width: 1650px) {
  h1 {
    font-size: 35px;
  }

  h3 {
    font-size: 16px;
    line-height: 25px;
  }

  .main-container-button .p-button,
  .main-container-buttons .p-button {
    width: 290px;
    font-size: 18px;
  }
}

@media (max-width: 1480px) {
  h1 {
    font-size: 30px;
  }
}

@media (max-width: 1350px) {
  h1 {
    font-size: 25px;
  }

  h3 {
    font-size: 14px;
    line-height: 20px;
  }

  .main-container-button .p-button,
  .main-container-buttons .p-button {
    width: 265px;
    font-size: 16px;
  }
}

@media (max-width: 1200px) {
  .main-container {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .main-information {
    width: 100%;
  }

  h1 {
    font-size: 37px;
  }

  h3 {
    font-size: 17px;
  }

  .main-container-button .p-button,
  .main-container-buttons .p-button {
    width: 385px;
  }
}

@media (max-width: 865px) {
  .main-container {
    padding: 0 60px;
  }
}

@media (max-width: 595px) {
  .main-information {
    width: 83%;
  }
}

@media (max-width: 490px) {
  .main-container {
    padding: 0 10px;
  }
}

@media (max-width: 430px) {
  .main-information {
    width: 95%;
  }
}

@media (max-width: 400px) {
  .main-container-button .p-button,
  .main-container-buttons .p-button {
    width: 100%;
  }
}
</style>
