<template>
  <authorization>
    <form class="authorization-form">
      <img src="@/assets/logo-auth.png" alt="Symptom logo" />

      <h4>Почта <span>*</span></h4>
      <input-text type="mail" v-model="email" />

      <h4>Пароль <span>*</span></h4>
      <input-text type="password" v-model="password" />

      <p-button label="Вход" @click="checkDoctor" />
    </form>
  </authorization>
</template>

<script setup lang="ts">
import Authorization from "./components/Authorization.vue";
import { useAuthorizationStore } from "./store/authorization.store";
import { validateDoctor } from "@/utils/validation";
import { ref } from "vue";

import PButton from "primevue/button";
import InputText from "primevue/inputtext";

const authorizationStore = useAuthorizationStore();
const password = ref("");
const email = ref("");

function checkDoctor(): void {
  if (validateDoctor(email.value, password.value)) {
    authorizationStore.postLoginDoctorData(email.value, password.value);
  }
}
</script>

<style scoped>
.authorization-form {
  width: 50%;
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
  margin-top: 8px;
}

.authorization-form .p-button {
  margin-top: 8px;
  height: 45px;
  font-weight: 600;
  border-radius: 5px;
}
</style>
