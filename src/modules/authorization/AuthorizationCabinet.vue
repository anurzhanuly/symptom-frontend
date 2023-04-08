<template>
  <authorization>
    <form v-if="isSignupRoute" class="authorization-form">
      <img src="@/assets/logo-auth.png" alt="Symptom logo" />
      <div>
        <h4>Имя <span>*</span></h4>
        <input-text v-model="firstName" />
      </div>
      <div>
        <h4>Фамилия <span>*</span></h4>
        <input-text v-model="lastName" />
      </div>
      <div>
        <h4>Отчество</h4>
        <input-text v-model="middleName" />
      </div>
      <div>
        <h4>Номер телефона <span>*</span></h4>
        <input-text v-model="phone" />
      </div>
      <div>
        <h4>Выберите клинику</h4>
        <dropdown
          v-model="сlinic"
          :options="clinics"
          option-value="attributes.name"
          option-label="attributes.name"
          filter-placeholder="Поиск"
          filter
          lazy
          :empty-filter-message="'Ничего не найдено'"
          :empty-message="'Ничего не найдено'"
        />
      </div>
      <div>
        <h4>Выберите врача</h4>
        <dropdown
          v-model="doctor"
          :options="doctorsFIO"
          option-value="id"
          option-label="name"
          filter-placeholder="Поиск"
          filter
          lazy
          :empty-filter-message="'Ничего не найдено'"
          :empty-message="'Ничего не найдено'"
        />
      </div>
      <p-button label="Пройти опрос" @click="goToSurvey" />
    </form>
    <form v-if="!isSignupRoute" class="authorization-form">
      <img src="@/assets/logo-auth.png" alt="Symptom logo" />
      <div>
        <h4>Номер телефона <span>*</span></h4>
        <input-text v-model="loginPhone" />
      </div>
      <div>
        <h4>Пароль <span>*</span></h4>
        <input-text v-model="password" type="password" />
      </div>
      <p-button label="Вход" @click="goToPatientCab" />
    </form>
  </authorization>
</template>

<script setup lang="ts">
import Authorization from "./components/Authorization.vue";
import { useClinicsStore } from "@/modules/admin/stores/clinics.store";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { warn } from "@/utils/toast";
import { storeToRefs } from "pinia";

import PButton from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

const router = useRouter();
const route = useRoute();
const clinicStore = useClinicsStore();

const isSignupRoute = computed(() => route.path === "/clientSignup");

const { clinics, doctorsFIO } = storeToRefs(clinicStore);

const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const phone = ref("");
const сlinic = ref("");
const doctor = ref("");
const loginPhone = ref("");
const password = ref("");
const userRegisterData = ref<any>({}); // TODO: Сделать тип как будет авторизация
const userLoginData = ref<any>({}); // TODO: Сделать тип как будет авторизация

const goToSurvey = (): void => {
  if (validateRegisterForm()) {
    router.push("survey");
  }
};

const goToPatientCab = (): void => {
  if (validateLoginForm()) {
  }
  router.push("/patientcab/main");
};

const validateRegisterForm = (): boolean => {
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;
  const phonePattern = /^8[0-9]{10}$/;

  if (!firstName.value) {
    warn("Внимание", "Поле 'Имя' должно быть заполнено");
    return false;
  }

  if (firstName.value.length > 2 && !cyrillicPattern.test(firstName.value)) {
    warn("Внимание", "Поле 'Имя' должно быть на кириллице и больше 2 символов");
    return false;
  }

  if (!lastName.value) {
    warn("Внимание", "Поле 'Фамилия' должно быть заполнено");
    return false;
  }

  if (lastName.value.length > 2 && !cyrillicPattern.test(lastName.value)) {
    warn("Внимание", "Поле 'Фамилия' должно быть на кириллице и больше 2 символов");
    return false;
  }

  if (middleName.value && !cyrillicPattern.test(middleName.value)) {
    warn("Внимание", "Поле 'Отчество' должно быть заполнено");
    return false;
  }

  if (!phonePattern.test(phone.value)) {
    warn("Внимание", "Поле 'Номер телефона' должен начинаеться с 8 и иметь 11 символов");
    return false;
  }

  if (middleName.value) {
    middleName.value = middleName.value
      .split(" ")
      .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  firstName.value = firstName.value
    .split(" ")
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  lastName.value = lastName.value
    .split(" ")
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  userRegisterData.value = {
    firstName: firstName.value,
    lastName: lastName.value,
    middleName: middleName.value,
    phone: phone.value,
    сlinic: сlinic.value,
    doctor: doctor.value,
  };

  return true;
};

const validateLoginForm = (): boolean => {
  const phonePattern = /^8[0-9]{10}$/;

  if (!phonePattern.test(phone.value)) {
    warn("Внимание", "Номер телефона' должен начинаеться с 8 и иметь 11 символов");
    return false;
  }

  userLoginData.value = {
    loginPhone: loginPhone.value,
    password: password.value,
  };

  return true;
};
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

.authorization-form .p-inputtext,
.authorization-form .p-dropdown {
  margin-top: 8px;
}

.authorization-form .p-button {
  margin-top: 8px;
  height: 45px;
  font-weight: 600;
  border-radius: 5px;
}
</style>
