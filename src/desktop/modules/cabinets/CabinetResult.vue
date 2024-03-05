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
