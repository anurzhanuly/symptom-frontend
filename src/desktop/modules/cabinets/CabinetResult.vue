<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCabinetsStore } from './store/cabinets.store';
import BaseResultCard from './components/BaseResultCard.vue';
import { CABINET_RESULT_ID } from '@/utils/localStorageKeys';

import UiLoader from '@/ui/UiLoader.vue';

const cabinetsStore = useCabinetsStore();

const { patientResult, patientCard, recommendations, isLoading } =
    storeToRefs(cabinetsStore);

onMounted(async () => {
    const clientCabinetResultId = localStorage.getItem(CABINET_RESULT_ID);

    if (clientCabinetResultId) {
        await cabinetsStore.getClientResultData(clientCabinetResultId);
    }
});
</script>

<template>
    <ui-loader v-if="isLoading" />
    <base-result-card
        v-else
        :route-name="'client-cabinet'"
        :patient-result="patientResult"
        :patient-card="patientCard"
        :recommendations="recommendations"
    />
</template>
