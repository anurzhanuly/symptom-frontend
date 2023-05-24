<template>
  <panel header="Наименование вопроса в рекомендациях">
    <input-text
      v-model="beforeQuestName"
      placeholder="До"
    />
    <dropdown
      v-model="afterQuestName"
      :options="questionNameOptions"
      option-value="value"
      option-label="value"
      placeholder="После"
      filter-placeholder="Поиск"
      filter
      lazy
      :empty-filter-message="'Ничего не найдено'"
      :empty-message="'Ничего не найдено'"
    />
    <p-button
      label="Изменить"
      :disabled="!isReadyToChange"
      @click="confirmChange($event)"
    />
  </panel>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useAdminStore } from "@/modules/admin/stores/admin.store";
import { useConfirm } from "primevue/useconfirm";

import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import PButton from "primevue/button";
import Panel from "primevue/panel";

const adminStore = useAdminStore();
const confirm = useConfirm();

const beforeQuestName = ref("");
const afterQuestName = ref("");

const isReadyToChange = computed(() => {
  return beforeQuestName.value && afterQuestName.value ? true : false;
});
const recommendationsJSON = computed(() => adminStore.allRecommendations || []);
const questionNameOptions = computed(() => adminStore.conditionColumns[0].options || {});

function changeQuestName(): void {
  const recommendationStr = JSON.stringify(recommendationsJSON.value);
  const newRecommendation = recommendationStr.split(beforeQuestName.value).join(afterQuestName.value);
  console.log(newRecommendation);
}

function confirmChange(event: any): void {
  confirm.require({
    target: event.currentTarget,
    message: "Вы уверены?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: changeQuestName,
  });
}
</script>

<style scoped>
.p-inputtext,
.p-dropdown {
  width: 100%;
  margin-bottom: 15px;
}

.p-button {
  width: 100%;
  font-size: 18px;
}
</style>
