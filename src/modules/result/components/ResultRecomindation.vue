<template>
  <p-button v-if="!isButtonsVisible" label="На главную" class="p-button-outlined" @click="$router.push('/')" />
  <div class="recomindation-result">
    <card>
      <template #title>Рекомендации</template>
      <template #content>
        <ul v-for="(resultItem, index) in recommendations" :key="index" class="result-list">
          <li v-for="(item, idx) in resultItem.recommendations" :key="idx" class="result-list__item">- {{ item }}</li>
        </ul>
      </template>
      <template #footer v-if="isButtonsVisible">
        <p-button label="Открыть в PDF" class="p-button-raised" @click="resultStore.resultPDF" />
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
import { useSurveyStore } from "@/modules/survey/store/survey.store";
import { useResultStore } from "../store/result.store";
import { storeToRefs } from "pinia";

import Card from "primevue/card";
import PButton from "primevue/button";

const resultStore = useResultStore();
const surveyStore = useSurveyStore();
const { recommendations } = storeToRefs(surveyStore);
const { isButtonsVisible } = storeToRefs(resultStore);
</script>

<style scoped>
.recomindation-result {
  margin-top: 15px;
}
.result-list__item {
  margin-bottom: 10px;
}

.result-list {
  margin: 0 0 30px 20px;
}
</style>
