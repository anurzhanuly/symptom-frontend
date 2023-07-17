<template>
    <panel header="Изменить рекомендации">
        <div class="recommendations">
            <div class="recommendations-list">
                <listbox
                    v-model="selectedRecommendation"
                    filter
                    option-label="attributes.name"
                    :options="allRecommendations"
                />
            </div>
            <div v-if="selectedRecommendation" class="recommendations-tests">
                <toolbar>
                    <template #start>
                        <p-button
                            label="Добавить тест"
                            @click="adminStore.createTest"
                        />
                        <p-button
                            label="Сохранить изменения"
                            severity="success"
                            @click="updateTest"
                        />
                    </template>
                </toolbar>
                <panel
                    v-for="(key, _) in Object.keys(tests)"
                    :key="_"
                    :header="key"
                >
                    <template #icons>
                        <p-button
                            label="Удалить тест"
                            raised
                            rounded
                            severity="danger"
                            @click="deleteTestConfirm($event, key)"
                        />
                    </template>
                    <p-textarea v-model="tests[key]" rows="2" />
                </panel>
            </div>
        </div>
    </panel>
</template>

<script lang="ts" setup>
import { useAdminStore } from '@/modules/admin/stores/admin.store';
import { storeToRefs } from 'pinia';
import { warn } from '@/utils/toast';

import { useConfirm } from 'primevue/useconfirm';
import PButton from 'primevue/button';
import PTextarea from 'primevue/textarea';
import Listbox from 'primevue/listbox';
import Panel from 'primevue/panel';
import Toolbar from 'primevue/toolbar';

const confirm = useConfirm();
const adminStore = useAdminStore();
const { selectedRecommendation, allRecommendations, tests } =
    storeToRefs(adminStore);

function updateTest(): void {
    let isEmpty = false;

    for (const key in tests.value) {
        if (!tests.value[key]) {
            isEmpty = true;
        }

        if (isEmpty) {
            warn(
                'Пустое поле',
                'У вас есть пустое поле в рекоминдациях удалите его или добавьте описание'
            );
            return;
        }
    }

    adminStore.updateRecommendationData();
}

function deleteTestConfirm(event: any, key: string): void {
    confirm.require({
        target: event.currentTarget,
        message: 'Вы уверены?',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        icon: 'pi pi-exclamation-triangle',
        accept: () => adminStore.deleteTest(key),
    });
}
</script>

<style scoped>
.p-inputtextarea {
    margin-top: 10px;
    width: 100%;
}

.recommendations {
    display: flex;
    flex-direction: row;
}

.recommendations-list {
    width: 15%;
}

.recommendations-tests {
    width: 85%;
    margin-left: 10px;
}

.p-panel {
    margin-top: 5px;
}

.p-button {
    margin-right: 10px;
}
</style>
