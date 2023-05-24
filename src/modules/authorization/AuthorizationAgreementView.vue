<template>
  <authorization>
    <div class="agreement">
      <card>
        <template #header>
          <img src="@/assets/logo.png" />
        </template>
        <template #title><h3>Условия использования</h3></template>
        <template #content>
          <p>Дорогой пациент!</p>
          <ul>
            <li>
              <strong> Данный опрос и результаты не является диагностикой, лечением и заменой
                врача. </strong>
              Оно предназначено исключительно для общего сведения и не является квалифицированным
              медицинским
              заключением.
            </li>
            <li>
              <strong> Это обследование не предназначено для экстренных случаев. </strong>
              В случае неотложного состояния немедленно позвоните 103
            </li>
            <li>Мне есть 18 лет</li>
          </ul>

          <div class="agreement-check">
            <checkbox
              v-model="isUse"
              :binary="true"
            />
            <span>Я прочитал(а) и принимаю <strong
              @click="termsOfUse = true"
            >Условия использования.</strong></span>
            <inline-message
              v-if="isNotUse"
              severity="error"
            >
              Примите Условия использования.
            </inline-message>
            <br />

            <checkbox
              v-model="isProvicy"
              :binary="true"
            />
            <span>Я соглашаюсь на использование информации о моем здоровье для прохождения опроса. Полная информация
              доступна в <strong @click="privacyPolicy = true">Политика конфиденциальности.</strong></span>
            <inline-message
              v-if="isNotPrivacy"
              severity="error"
            >
              Пожалуйста, согласитесь с Политикой конфиденциальности и обработкой информации о ваших
              персональных
              медицинских данных.
            </inline-message>
          </div>

          <p-button
            label="Начать опрос"
            @click="checkAgreement"
          />
        </template>
      </card>
    </div>
  </authorization>

  <sidebar
    v-model:visible="termsOfUse"
    position="right"
    style="width: 60%"
  >
    <h1>Условия использования</h1>
    <ol>
      <li
        v-for="rule in TERMS_OF_USE"
        :key="rule.title"
      >
        <strong>{{ rule.title }}</strong>
        <ol>
          <li
            v-for="subRule in rule.subRules"
            :key="subRule?.title"
          >
            &ensp;{{ subRule?.title }}
            <ol>
              <li
                v-for="nestedSubRule in subRule?.subRules"
                :key="nestedSubRule?.title"
              >
                &ensp;&ensp;{{ nestedSubRule?.title }}
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </sidebar>

  <sidebar
    v-model:visible="privacyPolicy"
    position="right"
    style="width: 60%"
  >
    <h1>Политика в отношении обработки персональных данных</h1>
    <ol>
      <li
        v-for="rule in PRIVACY_POLICY"
        :key="rule.title"
      >
        <strong>{{ rule.title }}</strong>
        <ol>
          <li
            v-for="subRule in rule.subRules"
            :key="subRule?.title"
          >
            &ensp;<strong>{{ subRule?.title }}</strong>
            <ol>
              <li
                v-for="nestedSubRule in subRule?.subRules"
                :key="nestedSubRule?.title"
              >
                &ensp;&ensp;{{ nestedSubRule?.title }}
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </sidebar>
</template>

<script setup lang="ts">
import Authorization from "./components/Authorization.vue";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/utils/agreement";
import { useRouter } from "vue-router";
import { ref } from "vue";

import InlineMessage from "primevue/inlinemessage";
import PButton from "primevue/button";
import Checkbox from "primevue/checkbox";
import Card from "primevue/card";
import Sidebar from "primevue/sidebar";

const router = useRouter();

const isUse = ref(false);
const isProvicy = ref(false);
const isNotUse = ref(false);
const isNotPrivacy = ref(false);
const termsOfUse = ref(false);
const privacyPolicy = ref(false);

function checkAgreement(): void {
    if (!isUse.value && !isProvicy.value) {
        isNotUse.value = true;
        isNotPrivacy.value = true;
        return;
    }

    if (!isUse.value) {
        isNotUse.value = true;
        return;
    }

    if (!isProvicy.value) {
        isNotPrivacy.value = true;
        return;
    }

    router.push("survey");
}
</script>

<style scoped>
.agreement {
    padding: 15px;
}

.agreement p,
.agreement li {
    margin-top: 8px;
}

.agreement-check .p-checkbox {
    margin-right: 5px;
    margin-top: 12px;
}

.agreement-check strong {
    color: #1769aa;
    cursor: pointer;
}

.p-button {
    margin-top: 12px;
    width: 100%;
}

.p-card-header img {
    width: 80%;
    padding: 8% 2%;
}
</style>
