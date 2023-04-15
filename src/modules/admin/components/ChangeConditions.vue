<template>
  <panel header="Изменить условия рекомендаций">
    <div class="conditions">
      <div class="conditions-list">
        <listbox v-model="selectedRecommendation" :options="allRecommendations" filter optionLabel="attributes.name" />
        <panel>
          <div class="recommendations-block">
            <div>
              <input-text v-model="recomindationNewName" />
              <p-button
                label="Добавить рекомендацию"
                raised
                :disabled="!recomindationNewName"
                @click="adminStore.createRecommendationData"
              />
            </div>

            <div>
              <input-text v-model="recomindationDeleteName" />
              <p-button
                label="Удалить рекомендацию"
                raised
                severity="danger"
                :disabled="!recomindationDeleteName"
                @click="adminStore.deleteRecommendationData"
              />
            </div>
          </div>
        </panel>
      </div>
      <div v-if="selectedRecommendation" class="conditions-actions">
        <toolbar>
          <template #start>
            <p-button label="Добавить новый блок" raised @click="adminStore.createCondition" />
            <p-button
              label="Сохранить изменения"
              severity="success"
              raised
              @click="adminStore.updateRecommendationData"
            />
          </template>
        </toolbar>
        <panel
          v-for="(condition, index) in conditions"
          :key="index"
          :header="`${index + 1} -  ${selectedRecommendation.attributes.name}`"
        >
          <template #icons>
            <p-button
              label="Удалить блок"
              severity="danger"
              raised
              rounded
              @click="deleteConditionConfirm($event, index)"
            />
            <p-button
              label="Добавить условие блоку"
              severity="success"
              rounded
              raised
              @click="adminStore.createConditionItem(index)"
            />
          </template>

          <data-table
            v-model:selection="selectedCondition"
            selection-mode="single"
            :value="condition"
            show-gridlines
            edit-mode="cell"
            @cell-edit-complete="adminStore.updateCondition($event, index)"
          >
            <column v-for="(column, idx) in conditionColumns" :key="idx" :header="column.header" :field="column.field">
              <template #editor="{ data, field }">
                <div v-if="column.field === 'value'">
                  <p-multi-select
                    v-if="questions.filter(el => el.name === data.questionName)[0]?.choices"
                    v-model="data[field]"
                    :options="
                      questions
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
                    :empty-filter-message="'Ничего не найдено'"
                    :empty-message="'Ничего не найдено'"
                  />
                  <p-textarea v-else v-model="data[field]" style="width: 100%" />
                </div>
                <p-button
                  v-else-if="column.header === 'Удаление'"
                  icon="pi pi-times"
                  severity="danger"
                  @click="adminStore.deleteConditionItem(index)"
                />
                <dropdown
                  v-else-if="column.hasDropdown"
                  v-model="data[field]"
                  :options="column?.options"
                  option-value="value"
                  option-label="value"
                  placeholder="Выберите..."
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
import { useAdminStore } from "@/modules/admin/stores/admin.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useConfirm } from "primevue/useconfirm";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import PButton from "primevue/button";
import PMultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import PTextarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Listbox from "primevue/listbox";
import Toolbar from "primevue/toolbar";
import Panel from "primevue/panel";

const adminStore = useAdminStore();
const confirm = useConfirm();

const {
  allRecommendations,
  selectedRecommendation,
  conditions,
  selectedCondition,
  recomindationDeleteName,
  recomindationNewName,
  questions,
} = storeToRefs(adminStore);

const conditionColumns = computed(() => adminStore.conditionColumns || []);

function deleteConditionConfirm(event: any, index: number): void {
  confirm.require({
    target: event.currentTarget,
    message: "Вы уверены?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    icon: "pi pi-exclamation-triangle",
    accept: () => adminStore.deleteCondition(index),
  });
}
</script>

<style scoped>
.conditions {
  display: flex;
  flex-direction: row;
}

.new-record-button {
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
