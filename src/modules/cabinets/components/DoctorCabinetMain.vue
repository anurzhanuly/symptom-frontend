<template>
  <data-table
    selection-mode="single"
    :value="myConsultation"
    class="p-datatable-sm"
    reorderable-columns
    column-resize-mode="expand"
  >
    <template #header>
      <h2>Назначенные консультации</h2>
    </template>
    <column header="Дата опроса" field="attributes.date" />
    <column header="Жалобы" field="attributes.diagnose" />
    <column style="width: 7%">
      <template #body="slotProps">
        <p-button icon="pi pi-credit-card" class="p-button-text" @click="checkResult(slotProps.data.id)" />
      </template>
    </column>
  </data-table>
</template>

<script setup lang="ts">
import { useCabinetsStore } from "@/modules/cabinets/store/cabinets.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import PButton from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const cabinetsStore = useCabinetsStore();

onMounted(() => {
  cabinetsStore.getDoctorConsultationsData();
});

const { myConsultation } = storeToRefs(cabinetsStore);

function checkResult(Id: string) {
  cabinetsStore.getDoctorResultData(Id);
}
</script>
