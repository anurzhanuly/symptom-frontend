<script setup lang="ts">
import { useCabinetsStore } from '@desktop/modules/cabinets/store/cabinets.store';
import { useRouter } from 'vue-router';
import { useSurveyStore } from '@desktop/modules/survey/store/survey.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { warn } from '@/utils/toast';

import InputText from 'primevue/inputtext';
import PButton from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import BaseHeader from '@desktop/components/BaseHeader.vue';
import UiButton from '@/ui/UiButton.vue';

const cabinetsStore = useCabinetsStore();
const surveyStore = useSurveyStore();

const router = useRouter();

onMounted(async () => {
    await cabinetsStore.getDoctorConsultationsData();
});

const { myConsultation, filters, searchString } = storeToRefs(cabinetsStore);

function checkResult(id: string) {
    const result = cabinetsStore.getClientResultData(id);
    if (!result) {
        warn('Не найдено', 'Результаты не найдены');
    }
    localStorage.setItem('clientCabinetResultId', id);
    router.push(`/doctor-cabinet-result`);
}
</script>

<template>
    <base-header></base-header>
    <data-table
        class="p-datatable-sm"
        column-resize-mode="expand"
        data-key="id"
        :filters="filters"
        :global-filter-fields="['attributes.name']"
        reorderable-columns
        selection-mode="single"
        striped-rows
        :value="myConsultation"
    >
        <template #header>
            <div class="request-table-header">
                <h2 class="request-table-title">Назначенные консультации</h2>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <input-text
                        v-model="searchString"
                        placeholder="Поиск"
                    />
                </span>
            </div>
        </template>
        <ui-button
            class="table__button"
            is-blue
            is-big
            @click="$router.push({ name: '/doctor-cabinet-settings' })"
        >
            Настройки
        </ui-button>
        <column header="Дата опроса">
            <template #body="slotProps">
                <p-button
                    class="p-button-text"
                    @click="checkResult(slotProps.data.id)"
                >
                    {{ slotProps.data.attributes.name }}
                </p-button>
            </template>
        </column>
    </data-table>
</template>

<style scoped>
.request-table-header {
    display: flex;
    flex-direction: column;
}

.request-table-title {
    margin-bottom: 16px;
}

.request-table-header .p-inputtext {
    margin-right: 5px;
}

.table__button {
    margin: 20px 8px;
}
</style>
