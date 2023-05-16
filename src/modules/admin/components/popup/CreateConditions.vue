<template>
  <div>
    <div v-for="(column, idx) in conditionColumns" :key="idx">
      <div v-if="column.field === 'questionName'">
        <h3>{{ column.header }}</h3>
        <dropdown
          v-model="newRecord[column.field]"
          :options="column?.options"
          option-value="value"
          option-label="value"
          placeholder="Выберите..."
          filter-placeholder="Поиск"
          filter
          lazy
          :empty-filter-message="'Ничего не найдено'"
          :empty-message="'Ничего не найдено'"
          @change="addValueOptions"
        />
      </div>

      <div v-else-if="column.hasDropdown">
        <h3>{{ column.header }}</h3>
        <dropdown
          v-model="newRecord[column.field]"
          :options="column?.options"
          option-value="value"
          option-label="value"
          placeholder="Выберите..."
          filter-placeholder="Поиск"
          filter
          lazy
          :empty-filter-message="'Ничего не найдено'"
          :empty-message="'Ничего не найдено'"
        />
      </div>

      <div v-else-if="column.field === 'value'">
        <div v-if="!isValueHasChoices">
          <h3>{{ column.header }}</h3>
          <input-text v-model="conditionValue" />
        </div>
        <div v-if="isValueHasChoices">
          <h3>{{ column.header }}</h3>
          <p-multi-select
            v-model="newRecord[column.field]"
            :options="valueOptions"
            placeholder="Выберите..."
            filter-placeholder="Поиск"
            filter
          />
        </div>
      </div>

      <div v-else-if="column.field === 'testCase'">
        <h3>{{ column.header }}</h3>
        <input-text v-model="newRecord[column.field]" />
      </div>
    </div>
    <p-button label="Создать" severity="success" autofocus @click="createCondition()" />
  </div>
</template>

<script lang="ts" setup>
import type { Condition } from "@/modules/admin/types/recommendations";
import { useAdminStore } from "@/modules/admin/stores/admin.store";
import { createPopupFields } from "@/utils/popUp";
import { error, success } from "@/utils/toast";
import { computed, ref, inject } from "vue";
import { storeToRefs } from "pinia";

import PMultiSelect from "primevue/multiselect";
import PButton from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

const adminStore = useAdminStore();
const dialogRef = inject<any>("dialogRef");

const valueOptions = ref<Record<string, string>[]>([]);
const isValueHasChoices = ref(false);
const conditionValue = ref("");

const { conditions, conditionIndex, questions, vals } = storeToRefs(adminStore);

const conditionColumns = computed(() => adminStore.conditionColumns);
const newRecord = ref(createPopupFields(conditionColumns.value.filter(el => el.header !== "Удаление")));

const conditionValidation = (): boolean => {
  if (!newRecord.value.questionName.length) {
    error("Ошибка", "Поле 'Наименование вопроса' должно быть заполнено");
    return false;
  }

  if (!newRecord.value.compare.length) {
    error("Ошибка", "Поле 'Условие' должно быть заполнено");
    return false;
  }

  if (!newRecord.value.value.length && isValueHasChoices.value) {
    error("Ошибка", "Поле 'Значение1' должно быть заполнено");
    return false;
  }

  if (!conditionValue.value.length && !isValueHasChoices.value) {
    error("Ошибка", "Поле 'Значение' должно быть заполнено");
    return false;
  }

  if (/\D/.test(newRecord.value.testCase) || !newRecord.value.testCase.length) {
    error("Ошибка", "Номер рекомендации должен состоять из цифр");
    return false;
  }

  return true;
};

const createCondition = () => {
  if (conditionValidation()) {
    const res = { ...newRecord.value } as unknown as Condition;
    const question: any = vals.value.filter(el => el.name === newRecord.value.questionName);

    res.multiple = question?.maxSelectedChoices > 1 ? true : false;
    res.type = question.type;
    res.value = isValueHasChoices.value ? res.value : conditionValue.value.split(",");

    conditions.value[conditionIndex.value].push(res);
    success("Успешно", "Условие создано, не забудьте сохранить");
    dialogRef.value.close();
  }
};

const addValueOptions = () => {
  const options = vals.value.filter(item => item.name === newRecord.value.questionName);
  if (options.length && options[0].choices) {
    valueOptions.value = options[0].choices;
    isValueHasChoices.value = true;
  } else {
    isValueHasChoices.value = false;
  }
};
</script>

<style scoped>
.p-dropdown,
.p-button,
.p-inputtext,
.p-multiselect {
  width: 100%;
  margin-top: 10px;
}

h3 {
  margin-top: 10px;
}
</style>
