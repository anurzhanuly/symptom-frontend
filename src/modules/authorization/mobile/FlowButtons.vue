<script lang="ts" setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import PButton from 'primevue/button';
import { useSurveyStore } from '@/modules/survey/store/survey.store';

const surveyStore = useSurveyStore();

const { isLoading, questions } = storeToRefs(surveyStore);

onMounted(() => {
    console.log(isLoading.value);
    console.log(questions.value);
    if (!questions.value) {
        surveyStore.getQuestionsData();
    }
});
</script>

<template>
    <div class="buttons">
        <h2 class="buttons__title">Пройти опрос</h2>
        <p-button
            class="buttons__item"
            label="Без регистрации"
            :loading="isLoading"
            @click="$router.push({ name: 'survey' })"
        />
        <p-button
            class="buttons__item"
            label="Для врача"
            outlined
            @click="$router.push({ name: 'client-test-auth' })"
        />
    </div>
</template>

<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: column;
    padding: 32px 16px;

    &__title {
        text-align: center;
        margin-bottom: 24px;
    }

    &__item {
        margin-bottom: 16px;
        justify-content: center;
        padding: 16px 0;
    }
}
</style>
