<template>
    <panel header="Изменить условия рекомендаций">
        <div class="conditions">
            <div class="conditions-list">
                <listbox
                    v-model="selectedRecommendation"
                    :options="allRecommendations"
                    filter
                    option-label="attributes.name"
                />
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
            <div
                v-if="selectedRecommendation"
                class="conditions-actions"
            >
                <toolbar>
                    <template #start>
                        <p-button
                            label="Добавить новый блок"
                            raised
                            @click="adminStore.createCondition"
                        />
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
                    <block-u-i :blocked="isLoading">
                        <data-table
                            v-model:selection="selectedCondition"
                            selection-mode="single"
                            :value="condition"
                            show-gridlines
                            edit-mode="cell"
                            @cell-edit-complete="adminStore.updateCondition($event, index)"
                        >
                            <column
                                v-for="(column, idx) in conditionColumns"
                                :key="idx"
                                :header="column.header"
                                :field="column.field"
                            >
                                <template #editor="{ data, field }">
                                    <div v-if="column.field === 'value'">
                                        <p-multi-select
                                            v-if="checkOptions(data.questionName)"
                                            v-model="data[field]"
                                            :options="checkOptions(data.questionName)"
                                            placeholder="Выберите..."
                                            filter-placeholder="Поиск"
                                            filter
                                            lazy
                                            :empty-filter-message="'Ничего не найдено'"
                                            :empty-message="'Ничего не найдено'"
                                        />
                                        <p-textarea
                                            v-else
                                            v-model="data[field]"
                                            style="width: 100%"
                                        />
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
                                    <input-text
                                        v-else
                                        v-model="data[field]"
                                        style="width: 100%"
                                    />
                                </template>
                            </column>
                        </data-table>
                    </block-u-i>
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
import BlockUI from "primevue/blockui";

const adminStore = useAdminStore();
const confirm = useConfirm();

const {
    allRecommendations,
    selectedRecommendation,
    conditions,
    selectedCondition,
    recomindationDeleteName,
    recomindationNewName,
    vals,
    isLoading
} = storeToRefs(adminStore);

const conditionColumns = computed(() => adminStore.conditionColumns || []);

function checkOptions(name: string) {
    const options = vals.value.filter(item => item.title === name);

    if (options.length && options[0].choices) {
        return options[0].choices;
    }

    return;
}

function deleteConditionConfirm(event: any, index: number): void {
    confirm.require({
        target: event.currentTarget,
        message: "Вы уверены?",
        acceptLabel: "Да",
        rejectLabel: "Нет",
        icon: "pi pi-exclamation-triangle",
        accept: () => adminStore.deleteCondition(index)
    });
}
</script>

<style scoped>
.conditions {
    display: flex;
    flex-direction: row;
}

.conditions-list {
    width: 15%;
}

.conditions-actions {
    width: 85%;
    margin-left: 10px;
}

.recommendations-block {
    display: flex;
    flex-direction: column;
}

.recommendations-block div:first-child {
    margin-bottom: 15px;
}
</style>
