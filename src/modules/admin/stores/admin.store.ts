import type { Condition, Recommendation } from "@/modules/admin/types/recommendations.js";
import type { DataTableCellEditCompleteEvent } from "primevue/datatable";
import type { Questions } from "../types/questions.js";
import { computed, onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import {
  getRecommendations,
  getQuestionsJson,
  deleteRecommendation,
  createRecommendation,
  getRecommendationDetail,
  updateRecommendation,
} from "../services/admin.refbooks.js";
import axios from "axios";
import { success } from "@/utils/toast.js";
import { useDialog } from "primevue/usedialog";

import CreateConditions from "../components/popup/CreateConditions.vue";

export const useAdminStore = defineStore("admin", () => {
  const allRecommendations = ref<Recommendation[]>([]);
  const selectedRecommendation = ref<Recommendation | null>();
  const questions = ref<Questions[]>([]);
  const selectedCondition = ref<Condition>();
  const questionsNames = ref<{ value: string }[]>([]);
  const conditionIndex = ref(0);

  const tests = ref();
  const lastTestKey = ref(1);
  const conditions = ref();
  const recomindationDeleteName = ref("");
  const recomindationNewName = ref("");

  const dialog = useDialog();

  onMounted(() => {
    if (!allRecommendations.value.length) {
      getRecommendationsData();
    }

    if (!questions.value.length) {
      getQuestionsData();
    }
  });

  watch(selectedRecommendation, async newRecommendationName => {
    const res = await getRecommendationDetail(newRecommendationName?.id!);
    if (!axios.isAxiosError(res)) {
      tests.value = res.data.data.attributes.tests;
      const keys = Object.keys(tests.value);
      lastTestKey.value = keys[keys.length - 1] ? Number(keys[keys.length - 1]) + 1 : 1;

      conditions.value = res.data.data.attributes.conditions;
    }
  });

  const conditionColumns = [
    {
      header: "Наименование вопроса",
      field: "questionName",
      hasDropdown: true,
      options: computed(() => questionsNames.value),
    },
    {
      header: "Условие",
      field: "compare",
      hasDropdown: true,
      options: [
        { value: "exact" },
        { value: "except" },
        { value: "greater" },
        { value: "less" },
        { value: "range" },
        { value: "optional" },
      ],
    },
    {
      header: "Значение",
      field: "value",
      hasDropdown: false,
      options: [],
    },
    {
      header: "Номер рекомендации",
      field: "testCase",
      hasDropdown: false,
      options: [],
    },
    {
      header: "Удаление",
      field: "",
      hasDropdown: false,
      options: [],
    },
  ];

  async function getQuestionsData(): Promise<void> {
    const res = await getQuestionsJson();
    if (!axios.isAxiosError(res)) {
      questions.value = res.data.data.attributes.questionnaire.pages.map((el: { elements: any }) => el.elements[0]);
      questionsNames.value = questions.value.map(el => {
        return { value: el.name };
      });
    }
  }

  async function getRecommendationsData(): Promise<void> {
    const res = await getRecommendations();
    if (!axios.isAxiosError(res)) {
      allRecommendations.value = res.data.data;
    }
  }

  function updateCondition(event: DataTableCellEditCompleteEvent, tableIndex: number): void {
    const updated = { ...event.newData };

    if (typeof updated.value === "string") {
      updated.value = updated.value.split(",");
    }

    if (event.newValue && event.value !== event.newValue) {
      conditions.value[tableIndex][event.index] = { ...updated };
    }
  }

  function deleteCondition(indexToDelete: number): void {
    conditions.value = conditions.value.filter((_: never, index: number) => index !== indexToDelete);

    success("Удаление блока условии", "Блок условии удален, не забудьте сохранить");
  }

  function createCondition() {
    conditions.value.push([]);
  }

  function createConditionItem(index: number): void {
    conditionIndex.value = index;
    dialog.open(CreateConditions, {
      props: {
        header: "Создание нового условия для блока",
        style: {
          width: "60%",
        },
        modal: true,
      },
    });
  }

  function deleteConditionItem(tableIndex: number): void {
    conditions.value[tableIndex] = conditions.value[tableIndex].filter(
      (item: Condition | undefined) => item !== selectedCondition.value,
    );

    success("Удаление условия", "Условие удалено, не забудьте сохранить");
  }

  async function createRecommendationData(): Promise<void> {
    const res = await createRecommendation(recomindationNewName.value);
    if (!axios.isAxiosError(res)) {
      allRecommendations.value.push(res.data.data);
      recomindationNewName.value = "";
    }
  }

  async function deleteRecommendationData(): Promise<void> {
    const foundedObject = allRecommendations.value.find(item => item.attributes.name === recomindationDeleteName.value);
    const res = await deleteRecommendation(foundedObject?.id!);
    if (!axios.isAxiosError(res)) {
      allRecommendations.value = allRecommendations.value.filter(item => item.id !== foundedObject?.id);

      success("Удаление рекоминдации", res.data.message);
      recomindationDeleteName.value = "";
      selectedRecommendation.value = null;
    }
  }

  async function updateRecommendationData(): Promise<void> {
    const res = await updateRecommendation(
      selectedRecommendation.value?.id!,
      selectedRecommendation.value?.attributes.name!,
      tests.value,
      conditions.value,
    );

    if (!axios.isAxiosError(res)) {
      success("Изменения рекоминдации", "Все изменения сохранены");
    }
  }

  function deleteTest(deleteKey: string): void {
    delete tests.value[deleteKey];

    const keys = Object.keys(tests.value);
    const sortedKeys = keys.sort((a: any, b: any) => a - b);
    const newObj: Record<string, string[]> = {};

    for (let i = 0; i < sortedKeys.length; i++) {
      newObj[i + 1] = tests.value[sortedKeys[i]];
    }

    tests.value = newObj;
    const newKeys = Object.keys(tests.value);
    lastTestKey.value = newKeys[newKeys.length - 1] ? Number(newKeys[newKeys.length - 1]) + 1 : 1;

    success("Удаление теста", "Тест удален, не забудьте сохранить");
  }

  function createTest(): void {
    tests.value[lastTestKey.value.toString()] = "";

    lastTestKey.value++;
  }

  return {
    allRecommendations,
    selectedRecommendation,
    tests,
    conditions,
    selectedCondition,
    questions,
    lastTestKey,
    recomindationDeleteName,
    recomindationNewName,
    questionsNames,
    conditionColumns,
    conditionIndex,
    getQuestionsData,
    updateCondition,
    deleteCondition,
    createCondition,
    deleteConditionItem,
    createConditionItem,
    getRecommendationsData,
    createRecommendationData,
    deleteRecommendationData,
    updateRecommendationData,
    deleteTest,
    createTest,
  };
});
