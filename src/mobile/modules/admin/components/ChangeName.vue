<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useAdminStore } from '@mobile/modules/admin/stores/admin.store';
import { useConfirm } from 'primevue/useconfirm';

import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import PButton from 'primevue/button';
import Panel from 'primevue/panel';

const adminStore = useAdminStore();
const confirm = useConfirm();

const beforeQuestName = ref('');
const afterQuestName = ref('');

onMounted(() => {
    if (!adminStore.allRecommendations.length) {
        adminStore.getRecommendationsData();
    }

    if (!adminStore.questions.length) {
        adminStore.getQuestionsData();
    }
});

const isReadyToChange = computed(() => {
    return !!(beforeQuestName.value && afterQuestName.value);
});
const recommendationsJSON = computed(() => adminStore.allRecommendations || []);
const questionNameOptions = computed(
    () => adminStore.conditionColumns[0].options || {}
);

function changeQuestName(): void {
    const recommendationStr = JSON.stringify(recommendationsJSON.value);
    const newRecommendation = recommendationStr
        .split(beforeQuestName.value)
        .join(afterQuestName.value);
}

function confirmChange(event: any): void {
    confirm.require({
        target: event.currentTarget,
        message: 'Вы уверены?',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: changeQuestName,
    });
}
</script>

<template>
    <panel header="Наименование вопроса в рекомендациях">
        <input-text
            v-model="beforeQuestName"
            placeholder="До"
        />
        <dropdown
            v-model="afterQuestName"
            :empty-filter-message="'Ничего не найдено'"
            :empty-message="'Ничего не найдено'"
            filter
            filter-placeholder="Поиск"
            lazy
            option-label="value"
            option-value="value"
            :options="questionNameOptions"
            placeholder="После"
        />
        <p-button
            :disabled="!isReadyToChange"
            label="Изменить"
            @click="confirmChange($event)"
        />
    </panel>
</template>

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
