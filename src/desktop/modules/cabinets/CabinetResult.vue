<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCabinetsStore } from './store/cabinets.store';
import BaseResultCard from './components/BaseResultCard.vue';

const cabinetsStore = useCabinetsStore();

const { patientResult, patientCard, recommendations } =
    storeToRefs(cabinetsStore);

onMounted(async () => {
    const clientCabinetResultId = localStorage.getItem('clientCabinetResultId');

    if (clientCabinetResultId) {
        await cabinetsStore.getClientResultData(clientCabinetResultId);
    }
});
</script>

<template>
    <base-result-card
        :patient-result="patientResult"
        :patient-card="patientCard"
        :recommendations="recommendations"
    ></base-result-card>
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
    align-items: center;
    padding-left: $sp4;
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
