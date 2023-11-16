<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import 'survey-core/defaultV2.min.css';
import 'survey-core/survey.i18n';
import { Model } from 'survey-core';
import { useSurveyStore } from '@desktop/modules/survey/store/survey.store';
import ProgressBar from 'primevue/progressbar';

const router = useRouter();
const surveyStore = useSurveyStore();

const { isLoading, questions } = storeToRefs(surveyStore);

onMounted(async () => {
    if (!questions.value) {
        await surveyStore.getQuestionsData();
    }
});

const progress = ref(0);
const progressLastValue = ref(0);
const surveyJson = computed(() => surveyStore.questions);

const survey = ref(new Model(surveyJson.value));
console.log(survey);
console.log(surveyJson.value);
survey.value.locale = 'ru';

watch(surveyJson, (newVal) => {
    survey.value = new Model(newVal);
    survey.value.locale = 'ru';
    survey.value.onCurrentPageChanged.add(onPageChange);
    survey.value.onComplete.add(onSurveyComplete);
});

survey.value.onCurrentPageChanged.add(onPageChange);
survey.value.onComplete.add(onSurveyComplete);

function onSurveyComplete(sender: { data: Record<string, string[]> }): void {
    const newData: Record<string, string[]> = {};
    const doctorId = +(localStorage.getItem('doctorId') ?? 0);

    for (const key in sender.data) {
        if (Array.isArray(sender.data[key])) {
            // Если ответ массив
            newData[key] = sender.data[key];
        } else if (typeof sender.data[key] === 'object') {
            // Если ответ объект
            let result = '';

            for (const [item, value] of Object.entries(sender.data[key])) {
                result += `${item}: ${value}, `;
            }

            newData[key] = [result];
        } else {
            // Если ответ строка
            newData[key] = [`${sender.data[key]}`];
        }

        if (newData[key].includes('none')) {
            newData[key] = ['Без особенностей'];
        }

        if (newData[key].includes('other')) {
            // Если выбрали Другое
            const commentKey = `${key}-Comment`;
            const value = sender.data[commentKey];
            newData[key] = [`${value}`];
        }
    }

    progress.value = 0;
    progressLastValue.value = 0;
    surveyStore.postAnswersDataChatGPT({
        answers: newData,
        patientID: +(localStorage.getItem('patientId') ?? 0),
        doctorID: doctorId,
    });

    router.push({
        path: '/result',
    });
}

function onPageChange(_: any, options: any): void {
    console.log(progress.value, progressLastValue.value);
    if (options.isNextPage) {
        progress.value += 3;
        progressLastValue.value += 3;

        if (survey.value.isLastPage) {
            console.log('last page');
            progress.value = 100;
        } else {
            progress.value = progressLastValue.value;
        }
    } else {
        progress.value -= 3;
        progressLastValue.value -= 3;
    }
}

onBeforeUnmount(() => {
    survey.value.onCurrentPageChanged.remove(onPageChange);
    survey.value.onComplete.remove(onSurveyComplete);
});
</script>

<template>
    <div class="survey">
        <div
            v-if="isLoading"
            class="survey__loading-block"
        >
            <p class="survey__text">
                <span class="survey__loader" />
                Пожалуйста подождите, загружаем вопросы
            </p>
        </div>
        <progress-bar :value="progress" />
        <SurveyComponent :model="survey" />
    </div>
</template>

<style scoped lang="scss">
.survey {
    min-height: 100vh;
    background-color: $white-darkest;
    z-index: 1;

    &__loading-block {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: $white-darkest;
        z-index: 2;
    }

    &__text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: $fz-normal;
    }

    &__loader {
        display: block;
        transform: translate(-50%, -50%);
        width: $sp6;
        height: $sp6;
        border: 2px solid $black-primary;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
}
</style>
