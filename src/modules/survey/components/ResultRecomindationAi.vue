<template>
    <div
        v-if="recommendationsChatGPT"
        class="recomindation-ai-result"
    >
        <card>
            <template #title>Рекомендации от SymptomAi</template>
            <template #content>
                <panel
                    v-for="(value, title) in recommendationsChatGPT"
                    :key="title"
                    :header="surveyStore.stringTitle(title)"
                    toggleable
                >
                    <div v-if="Array.isArray(value)">
                        <ul>
                            <li
                                v-for="(item, index) in value"
                                :key="index"
                            >
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul>
                            <li
                                v-for="(item, index) in value"
                                :key="index"
                            >
                                {{ index }}: {{ item }}
                            </li>
                        </ul>
                    </div>
                </panel>
            </template>

            <template
                v-if="isButtonsVisible"
                #footer
            >
                <p-button
                    label="Открыть в PDF"
                    class="p-button-raised"
                    @click="surveyStore.resultPDF"
                />
            </template>
        </card>
    </div>
</template>

<script setup lang="ts">
import { useSurveyStore } from "@/modules/survey/store/survey.store";
import { storeToRefs } from "pinia";

import Card from "primevue/card";
import Panel from "primevue/panel";
import PButton from "primevue/button";

const surveyStore = useSurveyStore();
const { recommendationsChatGPT, isButtonsVisible } = storeToRefs(surveyStore);
</script>

<style scoped>
.recomindation-ai-result {
    margin-top: 15px;
}

.p-panel {
    margin-bottom: 10px;
}
</style>
