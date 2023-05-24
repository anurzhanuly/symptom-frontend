<template>
  <data-table
    selection-mode="single"
    :value="myConsultation"
    class="p-datatable-sm"
    reorderable-columns
    column-resize-mode="expand"
    striped-rows
    data-key="id"
    :filters="filters"
    :global-filter-fields="['attributes.name']"
  >
    <template #header>
      <div class="request-table-header">
        <div>
          <h2>Назначенные консультации</h2>
        </div>

        <div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <input-text
              v-model="searchString"
              placeholder="Поиск"
            />
          </span>
        </div>
      </div>
    </template>
    <column
      header="Дата опроса"
      field="attributes.name"
    />
    <column style="width: 7%">
      <template #body="slotProps">
        <p-button
          icon="pi pi-credit-card"
          class="p-button-text"
          @click="checkResult(slotProps.data.id)"
        />
      </template>
    </column>
  </data-table>
</template>

<script setup lang="ts">
import { useCabinetsStore } from "@/modules/cabinets/store/cabinets.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import InputText from "primevue/inputtext";
import PButton from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const cabinetsStore = useCabinetsStore();

onMounted(() => {
    // TODO: Сделать рефакторинг
    cabinetsStore.getDoctorConsultationsData();
});

const { myConsultation, filters, searchString } = storeToRefs(cabinetsStore);

function checkResult(Id: string) {
    cabinetsStore.getDoctorResultData(Id);
}
</script>

<style scoped>
.request-table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.request-table-header .p-inputtext {
    margin-right: 5px;
}
</style>
