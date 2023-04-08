<template>
  <panel header="Изменить рекомендации">
    <div class="recommendations">
      <div class="recommendations-list">
        <listbox v-model="checkedRecommendationName" :options="allRecommendations" filter optionLabel="name" />
      </div>
      <div v-if="checkedRecommendationName" class="recommendations-actions">
        <toolbar>
          <template #start>
            <p-button label="Добавить" class="p-button-raised" @click="createRecommendationTest" />
            <p-button label="Сохранить" class="p-button-raised p-button-success" @click="saveRecommendationTests" />
          </template>
          <template #end>
            <input-number v-model="recommendationDeleteIndex" />
            <p-button
              label="Удалить"
              class="p-button-raised p-button-danger"
              :disabled="!recommendationDeleteIndex"
              @click="confirmDeleteRecommendation($event)"
            />
          </template>
        </toolbar>
        <panel v-for="(testKey, _) in Object.keys(copiedTests)" :key="_" :header="testKey" toggleable collapsed>
          <p-textarea v-model="copiedTests[testKey]" style="width: 100%; height: 100%" />
        </panel>
      </div>
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { useAdminStore } from "@/modules/admin/stores/admin.store";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useConfirm } from "primevue/useconfirm";
import PButton from "primevue/button";
import PTextarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import Listbox from "primevue/listbox";
import Panel from "primevue/panel";
import Toolbar from "primevue/toolbar";

const adminStore = useAdminStore();
const confirm = useConfirm();

const { checkedRecommendationName, allRecommendations } = storeToRefs(adminStore);

const copiedTests = ref<Record<string, string>>({});
const recommendationDeleteIndex = ref<number | null>(null);

onMounted(() => (checkedRecommendationName.value = null));

watch(checkedRecommendationName, newRecommendationName => {
  if (checkedRecommendationName.value) {
    const testRecommendations: Record<string, string[]> = allRecommendations.value.filter(
      el => el.name === newRecommendationName!.name,
    )[0].tests;

    copiedTests.value = {};
    for (let key in testRecommendations) {
      copiedTests.value[key] = testRecommendations[key].join(",");
    }
  }
});

const createRecommendationTest = () => {
  const testKeys = Object.keys(copiedTests.value);
  const key = `${+testKeys[testKeys.length - 1] + 1}`;
  copiedTests.value[key] = "";
};

const deleteRecommendation = () => {
  const filteredTests = {} as { [key: number]: string };
  Object.keys(copiedTests.value)
    .filter(elementInd => +elementInd !== recommendationDeleteIndex.value)
    .forEach((key, index) => {
      filteredTests[index + 1] = copiedTests.value[+key];
    });
  copiedTests.value = filteredTests;
  recommendationDeleteIndex.value = null;
};

const confirmDeleteRecommendation = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: "Вы уверены?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: deleteRecommendation,
  });
};

const saveRecommendationTests = () => {
  const newTests: Record<string, string[]> = {};
  for (let key in copiedTests.value) {
    newTests[key] = copiedTests.value[key].split(".,");
  }

  adminStore.saveRecommendationsData(checkedRecommendationName.value!.name, newTests);
};
</script>

<style scoped>
.recommendations {
  display: flex;
  flex-direction: row;
}

.recommendations-list {
  width: 15%;
}

.recommendations-actions {
  width: 85%;
  margin-left: 10px;
}

.p-button {
  margin-left: 10px;
}
</style>
