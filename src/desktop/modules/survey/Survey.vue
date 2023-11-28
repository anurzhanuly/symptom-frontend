<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import 'survey-core/defaultV2.min.css';
import 'survey-core/survey.i18n';
import { Model } from 'survey-core';
import { useSurveyStore } from '@desktop/modules/survey/store/survey.store';
import ProgressBar from 'primevue/progressbar';
import UiLoader from '@/ui/UiLoader.vue';
import UiButton from '@/ui/UiButton.vue';

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
const STORAGE_ITEM_KEY = 'my-survey';

const prevData = window.localStorage.getItem(STORAGE_ITEM_KEY) || null;

const hasPrevData = ref(
    window.localStorage.getItem(STORAGE_ITEM_KEY) ? true : false
);

const survey = ref(new Model(surveyJson.value));
survey.value.locale = 'ru';

restoreSurvey(surveyJson.value);

function restoreSurvey(surveyVal: any) {
    const newSurvey = new Model(surveyVal);
    newSurvey.locale = 'ru';

    if (prevData) {
        const data = JSON.parse(prevData);

        newSurvey.data = data;
        progress.value = data.progress;
        progressLastValue.value = data.previosProgress;

        if (data.pageNo) {
            newSurvey.currentPageNo = data.pageNo;
        }
    }

    survey.value = newSurvey;
    initSurveyHandler();
}

watch(surveyJson, (newVal) => {
    restoreSurvey(newVal);
});

function saveSurveyData(survey: any) {
    const data = survey.data;

    data.pageNo = survey.currentPageNo;
    data.progress = progress.value;
    data.previosProgress = progressLastValue.value;

    window.localStorage.setItem(STORAGE_ITEM_KEY, JSON.stringify(data));
}

function initSurveyHandler() {
    if (!survey.value) return;

    survey.value.onCurrentPageChanged.add(saveSurveyData);
    survey.value.onCurrentPageChanged.add(onPageChange);
    survey.value.onComplete.add(onSurveyComplete);
}

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

    window.localStorage.removeItem(STORAGE_ITEM_KEY);

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
    if (options.isNextPage) {
        progress.value += 3;
        progressLastValue.value += 3;

        if (survey.value.isLastPage) {
            progress.value = 100;
        } else {
            progress.value = progressLastValue.value;
        }
    } else {
        progress.value -= 3;
        progressLastValue.value -= 3;
    }
}

function continueTest() {
    hasPrevData.value = false;
}

function startNewTest() {
    hasPrevData.value = false;
    progress.value = 0;
    progressLastValue.value = 0;

    localStorage.removeItem(STORAGE_ITEM_KEY);

    survey.value = new Model(surveyJson.value);
    survey.value.locale = 'ru';

    initSurveyHandler();
}

initSurveyHandler();
</script>

<template>
    <div class="survey">
        <div
            v-if="hasPrevData"
            class="survey__continue-test"
        >
            <p class="survey__text">Желаете продолжить тест?</p>
            <div class="survey__buttons-wrapper">
                <ui-button
                    is-blue
                    class="survey__button"
                    @click="continueTest"
                >
                    Да
                </ui-button>
                <ui-button
                    is-white
                    @click="startNewTest"
                >
                    Нет, начать тест сначала
                </ui-button>
            </div>
        </div>
        <div
            v-if="isLoading"
            class="survey__loading-block"
        >
            <ui-loader
                is-loader-big
                is-loader-blue
            ></ui-loader>
            <p class="survey__text">Пожалуйста подождите, загружаем вопросы</p>
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
        z-index: 3;
    }

    &__continue-test {
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
        font-size: $fz-normal;
    }

    &__button {
        margin-right: $sp4;
    }
}
</style>
