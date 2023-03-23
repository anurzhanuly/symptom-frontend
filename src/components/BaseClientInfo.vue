<template>
  <div class="client-card-main">
    <section class="client-card-section">
      <div class="client-card">
        <h3>{{ props.clientFIO?.attributes.lastName }} {{ props.clientFIO?.attributes.firstName }}</h3>
        <div class="patient-info">
          <!-- <div class="patient-info-inner">
            <label>Пол</label>
            <p>Женский</p>
          </div>
          <div class="patient-info-inner">
            <label>Дата рождения</label>
            <p>22/03/1995</p>
          </div>
          <div class="patient-info-inner">
            <label>Возраст</label>
            <p>28 лет</p>
          </div> -->
          <div class="patient-info-inner">
            <label>Телефон</label>
            <p>{{ props.clientFIO?.attributes.phone }}</p>
          </div>
        </div>
      </div>

      <p-divider layout="vertical" />

      <div class="client-download-btn">
        <p-button :label="props.buttonLabel" class="p-button-raised p-button-text" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PDivider from "primevue/divider";
import PButton from "primevue/button";

const props = defineProps({
  buttonLabel: String,
  clientFIO: Object,
});
</script>

<style src="@/styles/result.css"></style>
