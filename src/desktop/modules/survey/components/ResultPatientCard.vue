<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useSurveyStore } from '../store/survey.store';

import Panel from 'primevue/panel';
import PButton from 'primevue/button';

const router = useRouter();
const surveyStore = useSurveyStore();
const { patientsCard } = storeToRefs(surveyStore);

const patientIdFromLocalStorage = computed(() =>
    localStorage.getItem('patientId')
);
const test = {
    'Общая информация': {
        'Вес:': '70',
        'Пол:': 'Мужской',
        'Рост:': '165',
        'Возраст:': '35',
    },
    Жалобы: {
        'Жалобы на данный момент:': 'Отрицает',
    },
    'История жизни': {
        'Отмеченные хр.заболевания:':
            'Сахарный диабет: нет, Артериальная гипертензия: нет, Гипотироидоз: нет, Онкологические заболевания: нет, Ишемическая болезнь сердца: нет,',
        'История хронических заболеваний:': 'отсутствует',
        'Инфекционные заболевания в течение жизни:': 'отрицает',
        'Наследственные заболевания:': 'Пациент не знает',
        'Медикаменты на данный момент:': 'не принимает',
        'Аллергия:': 'отсутсвует',
    },
    'Обзор органов систем': {
        'Опрос органов систем:': 'нет',
    },
};

function saveRecommendation() {
    router.push({ name: 'client-sign-in' });
    sessionStorage.setItem('saveRec', '1'); //TODO тупое быстрое решение
}
</script>

<template>
    <div class="patients-card">
        <h2 class="patients-card__title">Карточка пациента</h2>
        <panel
            v-for="(info, title) in patientsCard"
            :key="title"
            :header="surveyStore.stringTitle(title)"
            toggleable
            class="patients-card__panel"
        >
            <div
                v-for="(value, key) in info"
                :key="key"
                class="patients-card__result"
            >
                <p class="patients-card__result__title">{{ key }}</p>
                <p
                    class="patients-card__result__text"
                    v-html="value"
                />
            </div>
        </panel>
        <p-button
            v-if="!patientIdFromLocalStorage"
            label="Сохранить"
            @click="saveRecommendation"
        />
    </div>
</template>

<style scoped lang="scss">
.patients-card {
    padding: 16px;

    &__title {
        margin-bottom: 24px;
    }

    &__panel {
        margin-bottom: 16px;
    }

    &__result {
        display: flex;

        &__title {
            font-size: 20px;
            width: fit-content;
            margin-bottom: 8px;
        }

        &__text {
            font-size: 20px;
            margin-left: 8px;
            margin-bottom: 8px;
            max-width: 68%;
            text-align: left;
        }
    }
}

.p-button {
    width: 100%;
}
</style>
