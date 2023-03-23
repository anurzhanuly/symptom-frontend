<template>
  <div class="authorization-section">
    <div class="onboarding-main">
      <base-swiper />
    </div>
    <div class="authorization-main">
      <div class="link-back" @click="$router.push('/')">
        <span>&lt; Назад</span>
      </div>
      <div class="authorization-wrapper p-fluid">
        <form class="authorization-form">
          <img src="@/assets/main/logo-auth.png" alt="Symptom logo" />
          <div>
            <h4>Почта <span>*</span></h4>
            <input-text type="mail" v-model="email" />
          </div>
          <div>
            <h4>Пароль <span>*</span></h4>
            <input-text type="password" v-model="password" />
          </div>
          <p-button label="Вход" @click="checkDoctor" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSwiper from "@/components/BaseSwiper.vue";
import { useAuthorizationStore } from "./store/authorization.store";
import { warn } from "@/utils/toast";
import { ref } from "vue";

import PButton from "primevue/button";
import InputText from "primevue/inputtext";

const authorizationStore = useAuthorizationStore();
const password = ref<string>("");
const email = ref<string>("");

const validation = (): boolean => {
  if (!email.value) {
    warn("Ошибка", "Поле 'почта' не заполнено");
    return false;
  }

  if (!password.value) {
    warn("Ошибка", "Поле 'пароль' не заполнено");
    return false;
  }

  return true;
};

const checkDoctor = (): void => {
  if (validation()) {
    authorizationStore.postLoginData(email.value, password.value);
  }
};
</script>

<style src="@/styles/authorization.css"></style>
