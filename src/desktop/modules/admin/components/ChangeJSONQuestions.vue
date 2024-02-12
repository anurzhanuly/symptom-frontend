<script lang="ts" setup>
import type {
    QuestionsContent,
    ResQuestions,
} from '@desktop/modules/admin/types/questions';
import type { AxiosError, AxiosResponse } from 'axios';
import { useSymptomApi } from '@desktop/services/api';
import { ref, onMounted } from 'vue';
import { useAdminStore } from '@desktop/modules/admin/stores/admin.store';

import Panel from 'primevue/panel';
import PTextarea from 'primevue/textarea';
import PButton from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import BaseHeader from '@/desktop/components/BaseHeader.vue';
import { tabRoutes } from '@desktop/modules/admin/config';

const surveyStr = ref('');
const adminPages = ref(tabRoutes);
const adminStore = useAdminStore();

onMounted(() => {
    if (!adminStore.allRecommendations.length) {
        adminStore.getRecommendationsData();
    }

    if (!adminStore.questions.length) {
        adminStore.getQuestionsData();
    }
});

async function changeSurveyQuestions(): Promise<void> {
    if (!surveyStr.value) {
        return;
    }

    const surveyJSON: QuestionsContent = JSON.parse(
        surveyStr.value.split('\n').join('')
    );
    const questionsJson = surveyJSON.pages.filter((el) => {
        return el.elements[0].type !== 'expression';
    });

    const questions = {
        content: { pages: questionsJson },
    };

    await changeQuestionsJson(questions);
}

async function changeQuestionsJson(
    questions: ResQuestions
): Promise<AxiosError | AxiosResponse> {
    try {
        return await useSymptomApi.post('/questionnaires/new', questions);
    } catch (error) {
        console.log(error);
        return error as AxiosError<Error>;
    }
}
</script>

<template>
    <base-header />
    <tab-menu :model="adminPages" />
    <panel header="Вставьте сюда json с вопросами из survey">
        <p-textarea
            v-model="surveyStr"
            rows="25"
        />
        <p-button
            label="Сохранить"
            @click="changeSurveyQuestions"
        />
    </panel>
</template>

<style scoped>
.p-inputtext {
    width: -webkit-fill-available;
}

.p-button {
    margin-top: 20px;
    width: 350px;
}
</style>
