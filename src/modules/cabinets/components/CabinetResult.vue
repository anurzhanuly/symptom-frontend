<template>
    <div class="result">
        <div class="result-card">
            <card>
                <template #content>
                    <div class="result-card-content">
                        <div>
                            <h3>
                                Врач: {{ doctorResult?.attributes.firstName }} {{ doctorResult?.attributes.lastName }}
                                {{ doctorResult?.attributes.midName }}
                            </h3>

                            <p>
                                Специализация: {{ doctorResult?.attributes.specialization }} | Опыт:
                                {{ doctorResult?.attributes.experience }}
                            </p>
                        </div>

                        <divider layout="vertical" />

                        <div>
                            <h3>
                                Пациент: {{ patientResult?.attributes.firstName }} {{ patientResult?.attributes.lastName
                                }}
                            </h3>

                            <p>Номер телефона: {{ patientResult?.attributes.phone }}</p>
                        </div>

                        <divider layout="vertical" />

                        <div>
                            <p-button
                                label="Результаты в PDF"
                                outlined
                            />
                        </div>
                    </div>
                </template>
            </card>
        </div>

        <div class="result-patient-answer">
            <panel
                header="Ответы пациента"
                toggleable
            >
                <ul>
                    <li
                        v-for="(answer, question) in patientAnswer"
                        :key="question"
                    >
                        <strong>{{ question }}</strong> {{ answer[0] }}
                    </li>
                </ul>
            </panel>
        </div>

        <div class="result-recommendations">
            <panel
                header="Рекомендации"
                toggleable
            >
                <ul>
                    <li
                        v-for="(recommendation, index) in recommendations"
                        :key="index"
                    >
                        <strong>{{ index + 1 }}:</strong> {{ recommendation }}
                    </li>
                </ul>
            </panel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCabinetsStore } from "../store/cabinets.store";
import { storeToRefs } from "pinia";

import Card from "primevue/card";
import PButton from "primevue/button";
import Divider from "primevue/divider";
import Panel from "primevue/panel";

const cabinetsStore = useCabinetsStore();

const { patientResult, doctorResult, patientAnswer, recommendations } = storeToRefs(cabinetsStore);
</script>

<style scoped>
.result {
    padding: 15px;
}

.result-card p {
    margin-top: 15px;
}

.result-card-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.result-recommendations,
.result-patient-answer {
    margin-top: 7px;
}

.result-recommendations li,
.result-patient-answer li {
    margin-top: 3px;
}
</style>
