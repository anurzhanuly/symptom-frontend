<script setup lang="ts">
import { useCabinetsStore } from './store/cabinets.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import { useSurveyStore } from '@/modules/survey/store/survey.store';

import InputText from 'primevue/inputtext';
import PButton from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const cabinetsStore = useCabinetsStore();
const surveyStore = useSurveyStore();

const { resultAnswersChatGPT } = storeToRefs(surveyStore);
const { myConsultation, searchString, filters } = storeToRefs(cabinetsStore);

onMounted(async () => {
    await cabinetsStore.getClientConsultationsData();

    if (
        localStorage.getItem('saveRec') &&
        +(localStorage.getItem('patientId') ?? 0) //TODO переделать
    ) {
        await surveyStore.postAnswersDataChatGPT({
            answers: resultAnswersChatGPT.value,
            patientID: +(localStorage.getItem('patientId') ?? 0),
            doctorID: +(localStorage.getItem('doctorId') ?? 0),
        });

        await cabinetsStore.getClientConsultationsData();
    }
});

function checkResult(Id: string) {
    cabinetsStore.getClientResultData(Id);
}
</script>

<template>
    <div>
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
                    <h2 class="request-table-title">История обращений</h2>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <input-text
                            v-model="searchString"
                            placeholder="Поиск"
                        />
                    </span>
                </div>
            </template>
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
    </div>
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

.p-button-text {
    width: 100%;
}
</style>
