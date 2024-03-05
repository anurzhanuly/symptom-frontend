<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useAdminStore } from '@desktop/modules/admin/stores/admin.store';

import Header from './components/Header.vue';
import UiButton from '@/ui/UiButton.vue';
import { warn } from '@/utils/toast';
import Dropdown from 'primevue/dropdown';

const adminStore = useAdminStore();
const router = useRouter();

onMounted(() => {
    localStorage.removeItem('diseaseId');

    if (!adminStore.allDiseases.length) {
        adminStore.getDiseasesData();
    }
});

const { allDiseases } = storeToRefs(adminStore);
const diseaseId = ref('');

function chooseSurveyFlow() {
    const surveyType = localStorage.getItem('surveyFlow');

    if (surveyType) {
        router.push({ name: 'client-test-auth' });
    } else {
        router.push({ name: 'agreement' });
    }
}

function goToSurvey() {
    if (!diseaseId.value) {
        warn('Внимание', 'Выберите пожалуйста болезнь из списка');
        return false;
    }

    localStorage.setItem('diseaseId', diseaseId.value);
    chooseSurveyFlow();
}
</script>

<template>
    <div class="survey-type">
        <Header />
        <h2 class="survey-type__title">Выберите тип теста</h2>
        <ui-button
            is-big
            is-blue
            class="survey-type__item"
            @click="chooseSurveyFlow"
        >
            Пройти общий тест
        </ui-button>
        <br />
        <span class="survey-type__text"> Или пройдите тест по болезни </span>
        <dropdown
            v-model="diseaseId"
            :empty-message="'Ничего не найдено'"
            filter
            filter-placeholder="Поиск"
            lazy
            option-label="attributes.name"
            option-value="id"
            :options="allDiseases"
            class="survey-type__dropdown"
        />
        <ui-button
            is-big
            is-blue
            class="survey-type__item"
            @click="goToSurvey"
        >
            Перейти в тест по болезни
        </ui-button>
    </div>
</template>

<style lang="scss" scoped>
.survey-type {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    padding: $sp6 $sp4;

    &__title {
        text-align: center;
        margin-bottom: $sp6;
        font-size: $fz-great;
    }

    &__item {
        margin-bottom: $sp6;
    }

    &__text {
        margin: $sp2 auto;
        font-size: $fz-bigger;
    }

    &__dropdown {
        margin-bottom: $sp4;
    }
}
</style>
