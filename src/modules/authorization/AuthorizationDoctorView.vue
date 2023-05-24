<template>
  <authorization>
    <div class="authorization-doctor">
      <form class="authorization-form p-fluid">
        <img
          src="@/assets/logo-auth.png"
          alt="Symptom logo"
        />

        <h4>Почта <span>*</span></h4>
        <input-text
          v-model="email"
          type="mail"
        />

        <h4>Пароль <span>*</span></h4>
        <p-password
          v-model="password"
          toggle-mask
        />

        <inline-message v-if="isWrong">Неверный пароль или почта</inline-message>
        <p-button
          label="Вход"
          @click="checkDoctor"
        />
      </form>
    </div>
  </authorization>
</template>

<script setup lang="ts">
import Authorization from "./components/Authorization.vue";
import { useAuthorizationStore } from "./store/authorization.store";
import { validateLogin } from "@/utils/validation";
import { ref } from "vue";

import PButton from "primevue/button";
import PPassword from "primevue/password";
import InputText from "primevue/inputtext";
import { storeToRefs } from "pinia";

const authorizationStore = useAuthorizationStore();
const { isWrong } = storeToRefs(authorizationStore);

const password = ref("");
const email = ref("");

function checkDoctor(): void {
    if (validateLogin(email.value, password.value)) {
        authorizationStore.postLoginDoctor(email.value, password.value);
    }
}
</script>

<style scoped>
.authorization-doctor {
    padding: 32%;
}

.authorization-form span {
    color: #d0312d;
}

.authorization-form img {
    margin-bottom: 20px;
}

.authorization-form h4 {
    color: #3f3f3f;
    font-weight: 400;
    margin-top: 8px;
}

.authorization-form .p-inputtext {
    width: 100%;
    margin-top: 8px;
}

.authorization-form .p-button {
    margin-top: 15px;
    height: 45px;
    font-weight: 600;
    border-radius: 5px;
    width: 100%;
}

@media only screen and (max-width: 750px) {
    .authorization-doctor {
        padding: 10%;
    }
}
</style>
