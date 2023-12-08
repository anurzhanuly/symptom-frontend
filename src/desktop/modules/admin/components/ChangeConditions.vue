<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAdminStore } from '@desktop/modules/admin/stores/admin.store';
import { storeToRefs } from 'pinia';

import { useConfirm } from 'primevue/useconfirm';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import PButton from 'primevue/button';
import PMultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import PTextarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Listbox from 'primevue/listbox';
import Toolbar from 'primevue/toolbar';
import Panel from 'primevue/panel';
import BlockUI from 'primevue/blockui';
import TabMenu from 'primevue/tabmenu';
import BaseHeader from '@/desktop/components/BaseHeader.vue';

const adminStore = useAdminStore();
const confirm = useConfirm();

const adminPages = ref([
    {
        label: 'Изменить JSON вопросов',
        icon: 'pi pi-fw pi-pencil',
        to: '/admin-quest',
    },
    {
        label: 'Изменить условия рекомендаций',
        icon: 'pi pi-fw pi-file',
        to: '/admin-cond',
    },
    {
        label: 'Изменить рекомендации',
        icon: 'pi pi-fw pi-book',
        to: '/admin-recom',
    },
    {
        label: 'Изменить наименование',
        icon: 'pi pi-fw pi-database',
        to: '/admin-magic',
    },
    {
        label: 'Список клиник',
        icon: 'pi pi-fw pi-book',
        to: '/admin-clinics',
    },
]);

const {
    allRecommendations,
    selectedRecommendation,
    conditions,
    selectedCondition,
    recomindationDeleteName,
    recomindationNewName,
    vals,
    isLoading,
} = storeToRefs(adminStore);

const conditionColumns = computed(() => adminStore.conditionColumns || []);

function checkOptions(name: string) {
    const options = vals.value.filter((item) => item.title === name);

    if (options.length && options[0].choices) {
        return options[0].choices;
    }

    return;
}

function deleteConditionConfirm(event: any, index: number): void {
    confirm.require({
        target: event.currentTarget,
        message: 'Вы уверены?',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        icon: 'pi pi-exclamation-triangle',
        accept: () => adminStore.deleteCondition(index),
    });
}
</script>

<template>
    <base-header />
    <tab-menu :model="adminPages" />
    <panel header="Изменить условия рекомендаций">
        <div class="conditions">
            <div class="conditions-list">
                <listbox
                    v-model="selectedRecommendation"
                    filter
                    option-label="attributes.name"
                    :options="allRecommendations"
                />
                <panel>
                    <div class="recommendations-block">
                        <div>
                            <input-text v-model="recomindationNewName" />
                            <p-button
                                :disabled="!recomindationNewName"
                                label="Добавить рекомендацию"
                                raised
                                @click="adminStore.createRecommendationData"
                            />
                        </div>

                        <div>
                            <input-text v-model="recomindationDeleteName" />
                            <p-button
                                :disabled="!recomindationDeleteName"
                                label="Удалить рекомендацию"
                                raised
                                severity="danger"
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
                            @click="adminStore.createBlockCondition"
                        />
                        <p-button
                            label="Сохранить изменения"
                            raised
                            severity="success"
                            @click="adminStore.updateRecommendationData"
                        />
                    </template>
                </toolbar>
                <panel
                    v-for="(condition, index) in conditions"
                    :key="index"
                    :header="`${index + 1} -  ${
                        selectedRecommendation.attributes.name
                    }`"
                >
                    <template #icons>
                        <p-button
                            label="Удалить блок"
                            raised
                            rounded
                            severity="danger"
                            @click="deleteConditionConfirm($event, index)"
                        />
                        <p-button
                            label="Добавить условие блоку"
                            raised
                            rounded
                            severity="success"
                            @click="adminStore.createConditionItem(index)"
                        />
                    </template>
                    <block-u-i :blocked="isLoading">
                        <data-table
                            v-model:selection="selectedCondition"
                            edit-mode="cell"
                            selection-mode="single"
                            show-gridlines
                            :value="condition"
                            @cell-edit-complete="
                                adminStore.updateCondition($event, index)
                            "
                        >
                            <column
                                v-for="(column, idx) in conditionColumns"
                                :key="idx"
                                :field="column.field"
                                :header="column.header"
                            >
                                <template #editor="{ data, field }">
                                    <div v-if="column.field === 'value'">
                                        <p-multi-select
                                            v-if="
                                                checkOptions(data.questionName)
                                            "
                                            v-model="data[field]"
                                            :empty-filter-message="'Ничего не найдено'"
                                            :empty-message="'Ничего не найдено'"
                                            filter
                                            filter-placeholder="Поиск"
                                            lazy
                                            :options="
                                                checkOptions(data.questionName)
                                            "
                                            placeholder="Выберите..."
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
                                        @click="
                                            adminStore.deleteConditionItem(
                                                index
                                            )
                                        "
                                    />
                                    <dropdown
                                        v-else-if="column.hasDropdown"
                                        v-model="data[field]"
                                        :empty-filter-message="'Ничего не найдено'"
                                        :empty-message="'Ничего не найдено'"
                                        filter
                                        filter-placeholder="Поиск"
                                        lazy
                                        option-label="value"
                                        option-value="value"
                                        :options="column?.options"
                                        placeholder="Выберите..."
                                        @change="
                                            field === 'questionName'
                                                ? (data.value = '')
                                                : null
                                        "
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
