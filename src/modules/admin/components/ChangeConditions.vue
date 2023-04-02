<template>
  <confirm-popup />
  <panel header="Изменить условия рекомендаций">
    <div class="conditions">
      <div class="conditions-list">
        <listbox v-model="checkedRecommendationName" :options="allRecommendations" filter optionLabel="name" />
        <panel header="Рекомендаций">
          <div class="recommendations-block">
            <div>
              <input-text v-model="newRecommendationName" placeholder="Добавить рекомендацию" />
              <p-button
                label="Добавить"
                class="p-button-raised"
                :disabled="!newRecommendationName"
                @click="createRecommendation"
              />
            </div>

            <div>
              <input-text v-model="diseaseDeleteName" placeholder="Удалить рекомендацию" />
              <p-button
                label="Удалить"
                class="p-button-raised p-button-danger"
                :disabled="!diseaseDeleteName"
                @click="confirmDeleteDisease($event)"
              />
            </div>
          </div>
        </panel>
      </div>
      <div v-if="checkedRecommendationName" class="conditions-actions">
        <toolbar>
          <template #start>
            <p-button label="Добавить" class="p-button-raised" @click="createCondition" />
            <p-button label="Сохранить" class="p-button-raised p-button-success" @click="saveConditions" />
          </template>
          <template #end>
            <input-number v-model="conditionDeleteIndex" />
            <p-button label="Удалить" class="p-button-raised p-button-danger" @click="confirmDeleteCondition($event)" />
          </template>
        </toolbar>
        <panel
          v-for="(arrCondition, index) in checkedRecommendationObj.conditions"
          :key="index"
          :header="`${index + 1}`"
          :toggleable="true"
          :collapsed="true"
        >
          <p-button
            icon="pi pi-plus"
            class="p-button-rounded p-button-success p-button-outlined create-rec-btn"
            @click="createConditionItem(index)"
          />
          <data-table
            v-model:selection="selectedCondition"
            selection-mode="single"
            :value="arrCondition"
            responsive-layout="scroll"
            scrollable
            class="p-datatable-sm"
            striped-rows
            reorderable-columns
            resizable-columns
            column-resize-mode="expand"
            show-gridlines
            edit-mode="cell"
            @cell-edit-complete="onCellEdit($event, index)"
          >
            <column v-for="(column, idx) in conditionColumns" :key="idx" :header="column.header" :field="column.field">
              <template #editor="{ data, field }">
                <div v-if="column.field === 'value'">
                  <p-multi-select
                    v-if="adminStore.questions.filter(el => el.name === data.questionName)[0]?.choices"
                    v-model="data[field]"
                    :options="
                      adminStore.questions
                        .filter(el => el.name === data.questionName)[0]
                        ?.choices.map(el => {
                          return { value: el };
                        })
                    "
                    option-value="value"
                    option-label="value"
                    placeholder="Выберите..."
                    filter-placeholder="Поиск"
                    filter
                    lazy
                    style="width: 250px"
                    :empty-filter-message="'Ничего не найдено'"
                    :empty-message="'Ничего не найдено'"
                  />
                  <p-textarea v-else v-model="data[field]" style="width: 100%" />
                </div>
                <p-button
                  v-else-if="column.header === 'Удаление'"
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger p-button-outlined"
                  @click="confirmDeleteConditionItem($event, index)"
                />
                <dropdown
                  v-else-if="column.hasDropdown"
                  v-model="data[field]"
                  :options="column?.options"
                  option-value="value"
                  option-label="value"
                  placeholder="Выберите..."
                  style="width: 250px"
                  filter-placeholder="Поиск"
                  lazy
                  filter
                  :empty-filter-message="'Ничего не найдено'"
                  :empty-message="'Ничего не найдено'"
                  @change="field === 'questionName' ? (data.value = '') : null"
                />
                <input-text v-else v-model="data[field]" style="width: 100%" />
              </template>
            </column>
          </data-table>
        </panel>
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import type { Condition, Recommendation } from "../types/recommendations";
import { useAdminStore } from "@/modules/admin/stores/admin.store";
import CreateConditions from "./popup/CreateConditions.vue";
import { ref, watch, computed, onMounted } from "vue";
import { error, success } from "@/utils/toast";
import type { Error } from "@/types/response";
import { storeToRefs } from "pinia";
import axios from "axios";

import DataTable, { type DataTableCellEditCompleteEvent } from "primevue/datatable";
import { useConfirm } from "primevue/useconfirm";
import { useDialog } from "primevue/usedialog";
import Column from "primevue/column";
import PButton from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import PMultiSelect from "primevue/multiselect";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import PTextarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Listbox from "primevue/listbox";
import Toolbar from "primevue/toolbar";
import Panel from "primevue/panel";

const confirm = useConfirm();
const adminStore = useAdminStore();
const dialog = useDialog();

const { allRecommendations, checkedRecommendationName } = storeToRefs(adminStore);

const checkedRecommendationObj = ref({} as Recommendation);
const selectedCondition = ref({} as Condition);
const newRecommendationName = ref<string>("");
const diseaseDeleteName = ref<string>("");
const conditionDeleteIndex = ref();

const conditionColumns = computed(() => adminStore.conditionColumns);

onMounted(() => (checkedRecommendationName.value = null));

/**
 * Здесь выбранный объект берёт ссылку и меняет сразу в сторе создание и удаление
 */
watch(checkedRecommendationName, newRecommendationName => {
  if (checkedRecommendationName.value) {
    checkedRecommendationObj.value = allRecommendations.value.filter(el => el.name === newRecommendationName.name)[0];
  }
});

const createRecommendation = () => {
  const newRecommendation: Recommendation = {
    id: allRecommendations.value[allRecommendations.value.length - 1].id + 1,
    name: newRecommendationName.value,
    conditions: [],
    tests: { 1: [""] },
  };

  adminStore.allRecommendations.push(newRecommendation);
  newRecommendationName.value = "";
};

const createConditionItem = (conditionIndex: number) => {
  adminStore.checkedRecommendationName = checkedRecommendationName.value;
  adminStore.conditionIndex = conditionIndex;
  dialog.open(CreateConditions, {
    props: {
      header: "Создание нового условия",
      style: {
        width: "50%",
      },
      modal: true,
    },
  });
};

const createCondition = () => {
  checkedRecommendationObj.value.conditions.push([{}] as Condition[]);
};

const saveConditions = async () => {
  const res = await adminStore.saveConditionsData(checkedRecommendationName.value);

  if (res.status === 200) {
    success("Успешно", "Изменения внесены");
  } else {
    if (axios.isAxiosError(res)) {
      const err = res.response?.data as Error;
      error("Ошибка", err.ERROR);
    }
  }
};

const onCellEdit = async (event: DataTableCellEditCompleteEvent, index: number) => {
  const updated = { ...event.newData };
  adminStore.checkedRecommendationName = checkedRecommendationName.value;
  adminStore.conditionIndex = index;
  if (typeof updated.value === "string") {
    updated.value = updated.value.split(",");
  }

  if (event.newValue && event.value !== event.newValue) {
    selectedCondition.value = { ...updated };
    adminStore.editLocalConditionsByIndex(event.index, updated);
  }
};

const deleteCondition = () => {
  if (checkedRecommendationObj.value.conditions[conditionDeleteIndex.value - 1]) {
    checkedRecommendationObj.value.conditions.splice(conditionDeleteIndex.value - 1, 1);
    conditionDeleteIndex.value = null;
  }
};

const confirmDeleteCondition = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: "Вы уверены?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: deleteCondition,
  });
};

const confirmDeleteConditionItem = (event: any, conditionIndex: number) => {
  confirm.require({
    target: event.currentTarget,
    message: "Вы уверены?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      adminStore.checkedRecommendationName = checkedRecommendationName.value;
      adminStore.conditionIndex = conditionIndex;
      adminStore.deleteConditionByIndex(selectedCondition.value);
    },
  });
};

const confirmDeleteDisease = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: "Вы уверены?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      adminStore.deleteDiseaseById(diseaseDeleteName.value);
    },
  });
};
</script>

<style scoped>
.conditions {
  display: flex;
  flex-direction: row;
}

.create-rec-btn {
  margin-bottom: 20px;
}

.condition-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.conditions-list {
  width: 15%;
}

.conditions-actions {
  width: 85%;
  margin-left: 10px;
}

.conditions-actions .p-button {
  margin-left: 10px;
}

.p-card {
  width: 27%;
  margin-top: 15px;
}

.recommendations-block {
  display: flex;
  flex-direction: column;
}

.recommendations-block div:first-child {
  margin-bottom: 15px;
}

.recommendations-block .p-button {
  width: 100%;
}

.recommendations-block .p-inputtext {
  width: 100%;
  margin-bottom: 5px;
}
</style>
