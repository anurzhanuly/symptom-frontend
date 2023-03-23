<template>
  <base-client-info :buttonLabel="'Скачать результаты'" />
  <section class="survey-result-section">
    <div class="result">
      <h3>🔍 Результаты:</h3>
      <div class="result-panels">
        <div>
          <p-panel header="Жалобы при поступлении:" :toggleable="true">
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </h4>
          </p-panel>
        </div>
        <div>
          <p-panel header="Анамнез заболевания:" :toggleable="true">
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </h4>
          </p-panel>
        </div>
        <div>
          <p-panel header="Анамнез жизни:" :toggleable="true">
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </h4>
          </p-panel>
        </div>
      </div>
    </div>
    <div class="patient-doctor">
      <h3>🩺 Ваш специалист:</h3>
      <div class="result-panels">
        <p-panel header="Мырзакулова Алия">
          <div class="patient-info">
            <div class="patient-info-inner">
              <label>Специализация</label>
              <p>Врач-отоларинтолог</p>
            </div>
            <div class="patient-info-inner">
              <label>Телефон</label>
              <p>+7 705 777 88 98</p>
            </div>
            <div class="patient-info-inner">
              <label>Место работы</label>
              <p>Поликлиника №9</p>
            </div>
            <div class="patient-info-inner">
              <label>Время приёма</label>
              <p>С 09:00 до 12:00</p>
            </div>
          </div>
        </p-panel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseClientInfo from "@/components/BaseClientInfo.vue";
import PPanel from "primevue/panel";
</script>

<style scoped src="@/styles/result.css"></style>
