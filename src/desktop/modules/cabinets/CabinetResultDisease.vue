<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCabinetsStore } from './store/cabinets.store';
import BaseResultCard from './components/BaseResultCard.vue';

import UiLoader from '@/ui/UiLoader.vue';

const cabinetsStore = useCabinetsStore();

const { patientResult, patientCard, recommendations, isLoading } =
    storeToRefs(cabinetsStore);

onMounted(async () => {
    const clientCabinetResultId = localStorage.getItem('clientCabinetResultId');

    if (clientCabinetResultId) {
        await cabinetsStore.getDiseaseResultData(clientCabinetResultId);
    }
});
</script>

<template>
    <ui-loader v-if="isLoading" />
    <base-result-card
        v-else
        :patient-result="patientResult"
        :patient-card="patientCard"
        :recommendations="recommendations"
    />
</template>
