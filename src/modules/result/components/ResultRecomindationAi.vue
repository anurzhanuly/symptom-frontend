<template>
  <div v-if="recommendationsChatGPT" class="recomindation-ai-result">
    <card>
      <template #title>Рекомендации от SymptomAi</template>
      <template #content>
        <p-panel
          v-for="(value, title) in recommendationsChatGPT"
          :key="title"
          :header="surveyStore.stringTitle(title)"
          toggleable
        >
          <div v-if="Array.isArray(value)">
            <ul>
              <li v-for="(item, index) in value" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li v-for="(item, index) in value" :key="index">{{ index }}: {{ item }}</li>
            </ul>
          </div>
        </p-panel>
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
import PPanel from "primevue/panel";
import PButton from "primevue/button";

const resultStore = useResultStore();
const surveyStore = useSurveyStore();
const { recommendationsChatGPT } = storeToRefs(surveyStore);
const { isButtonsVisible } = storeToRefs(resultStore);
</script>

<style scoped>
.recomindation-ai-result {
  margin-top: 15px;
}

.p-panel {
  margin-bottom: 10px;
}
</style>
