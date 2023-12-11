<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCabinetsStore } from './store/cabinets.store';

import Card from 'primevue/card';
import Panel from 'primevue/panel';
import UiButton from '@/ui/UiButton.vue';

const cabinetsStore = useCabinetsStore();

const { patientResult, patientCard, recommendations } =
    storeToRefs(cabinetsStore);

onMounted(() => {
    const clientCabinetResultId = localStorage.getItem('clientCabinetResultId');

    if (clientCabinetResultId && !patientCard.value) {
        cabinetsStore.getClientResultData(clientCabinetResultId);
    }
});
</script>

<template>
    <div class="result">
        <div class="result-card">
            <ui-button
                is-white
                icon="pi pi-angle-left header__button"
                class="result__button"
                @click="$router.back"
            >
                Назад
            </ui-button>
            <card>
                <template #content>
                    <div class="result-card-content">
                        <div>
                            <h3>
                                Пациент:
                                {{ patientResult?.attributes.firstName }}
                                {{ patientResult?.attributes.lastName }}
                            </h3>
                            <p>
                                Номер телефона:
                                {{ patientResult?.attributes.phone }}
                            </p>
                        </div>
                    </div>
                </template>
            </card>
        </div>

        <div class="result-patient-answer">
            <card>
                <template #title> Карточка пациента </template>
                <template #content>
                    <div
                        v-for="(data, num) in patientCard"
                        :key="num"
                    >
                        <panel
                            v-for="(info, title) in data"
                            :key="title"
                            :header="title.toString()"
                            toggleable
                        >
                            <p
                                v-for="(value, key) in info"
                                :key="key"
                                class="result__text"
                            >
                                {{ key }} {{ value }}
                            </p>
                        </panel>
                    </div>
                </template>
            </card>
        </div>

        <div class="result-recommendations">
            <card>
                <template #title> Рекомендации </template>
                <template #content>
                    <div v-if="typeof recommendations[0] === 'object'">
                        <panel
                            v-for="(item, index) in recommendations"
                            :key="index"
                            class="recommendation__panel"
                            :header="item.title"
                            toggleable
                        >
                            <p v-html="item.recommendation" />
                        </panel>
                    </div>
                    <div v-else>
                        <panel
                            v-for="(recommendation, index) in recommendations"
                            :key="index"
                            :header="(index + 1).toString()"
                            toggleable
                        >
                            <p v-html="recommendation" />
                        </panel>
                    </div>
                </template>
            </card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.result {
    padding: $sp4;
}

.result__button {
    margin-bottom: $sp4;
}

.result-card p {
    margin-top: 15px;
}

.result__text {
    margin: 0;
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

.p-panel {
    margin-bottom: 10px;
}
</style>
