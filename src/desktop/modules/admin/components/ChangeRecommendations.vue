<script lang="ts" setup>
import { ref } from 'vue';
import { useAdminStore } from '@desktop/modules/admin/stores/admin.store';
import { storeToRefs } from 'pinia';
import { warn } from '@/utils/toast';

import { useConfirm } from 'primevue/useconfirm';
import PButton from 'primevue/button';
import PTextarea from 'primevue/textarea';
import Listbox from 'primevue/listbox';
import Panel from 'primevue/panel';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import TabMenu from 'primevue/tabmenu';
import BaseHeader from '@/desktop/components/BaseHeader.vue';

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

<template>
    <base-header />
    <tab-menu :model="adminPages" />
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
            <div
                v-if="selectedRecommendation"
                class="recommendations-tests"
            >
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
                    <p>Title</p>
                    <input-text v-model="tests[key].title" />
                    <p>Text</p>
                    <p-textarea
                        v-model="tests[key].recommendation"
                        rows="4"
                    />
                </panel>
            </div>
        </div>
    </panel>
</template>

<style scoped>
.p-inputtextarea {
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
