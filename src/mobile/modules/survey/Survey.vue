<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import 'survey-core/defaultV2.min.css';
import 'survey-core/survey.i18n';
import { Model } from 'survey-core';
import {
    DISEASE_ID,
    SURVEY_CURRENT_ANSWERS,
    SURVEY_RESULT,
    DOCTOR_ID,
    PATIENT_ID,
} from '@/utils/localStorageKeys';
import { useSurveyStore } from '@mobile/modules/survey/store/survey.store';
import ProgressBar from 'primevue/progressbar';
import UiLoader from '@/ui/UiLoader.vue';
import UiButton from '@/ui/UiButton.vue';

const router = useRouter();
const surveyStore = useSurveyStore();
const diseaseId = localStorage.getItem(DISEASE_ID);

const { isLoading } = storeToRefs(surveyStore);
const progress = ref(0);
const progressLastValue = ref(0);
const isOfferTestVisible = ref(
    Boolean(window.localStorage.getItem(SURVEY_CURRENT_ANSWERS))
);

const surveyJson = computed(() => surveyStore.questions);

const survey = ref();

function createNewSurvey(surveyJsonData: any) {
    const newSurvey = new Model(surveyJsonData);
    const prevAnswersData = window.localStorage.getItem(SURVEY_CURRENT_ANSWERS);
    newSurvey.locale = 'ru';

    if (prevAnswersData) {
        const data = JSON.parse(prevAnswersData);

        newSurvey.data = data;
        progress.value = data.progress;
        progressLastValue.value = data.previosProgress;

        if (data.pageNo) {
            newSurvey.currentPageNo = data.pageNo;
        }
    }

    window.localStorage.removeItem(SURVEY_RESULT);

    survey.value = newSurvey;
    initSurveyHandler();
}

function saveSurveyData(survey: any) {
    const data = survey.data;

    data.pageNo = survey.currentPageNo;
    data.progress = progress.value;
    data.previosProgress = progressLastValue.value;

    window.localStorage.setItem(SURVEY_CURRENT_ANSWERS, JSON.stringify(data));
}

function initSurveyHandler() {
    if (!survey.value) return;

    survey.value.onCurrentPageChanged.add(saveSurveyData);
    survey.value.onCurrentPageChanged.add(onPageChange);
    survey.value.onComplete.add(onSurveyComplete);
}

async function onSurveyComplete(sender: {
    data: Record<string, string[]>;
}): Promise<void> {
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

    window.localStorage.removeItem(SURVEY_CURRENT_ANSWERS);

    const surveyAnswers = {
        answers: newData,
        patientID: +(localStorage.getItem('patientId') ?? 0),
        doctorID: doctorId,
    };
    try {
        let surveyResult;

        if (diseaseId) {
            surveyResult = await surveyStore.postAnswersData(
                surveyAnswers,
                diseaseId
            );
        } else {
            surveyResult = await surveyStore.postAnswersData(surveyAnswers);
        }

        localStorage.setItem(SURVEY_RESULT, JSON.stringify(surveyResult));

        router.push({
            path: '/result-recommendation',
        });
    } catch (error) {
        console.error(error);
    }
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

function startNewTest() {
    progress.value = 0;
    progressLastValue.value = 0;

    localStorage.removeItem(SURVEY_CURRENT_ANSWERS);
    window.localStorage.removeItem(SURVEY_RESULT);

    createNewSurvey(surveyJson.value);

    isOfferTestVisible.value = false;
}

onMounted(async () => {
    if (!surveyJson.value) {
        if (diseaseId) {
            await surveyStore.getQuestionsData(diseaseId);
        } else {
            await surveyStore.getQuestionsData();
        }
    }
});

watch(surveyJson, (newVal) => {
    if (!surveyJson.value) return;

    createNewSurvey(newVal);
});

createNewSurvey(surveyJson.value);
</script>

<template>
    <div class="survey">
        <div
            v-if="isLoading"
            class="survey__loading"
        >
            <ui-loader
                class="survey__loader"
                is-loader-big
                is-loader-blue
            />
            <p class="survey__text">Пожалуйста подождите, загружаем вопросы</p>
        </div>
        <div
            v-if="isOfferTestVisible"
            class="survey__offer"
        >
            <p class="survey__offer-text">Желаете продолжить тест?</p>
            <div class="survey__buttons-wrapper">
                <ui-button
                    is-blue
                    is-full
                    class="survey__button"
                    @click="isOfferTestVisible = false"
                >
                    Да
                </ui-button>
                <ui-button
                    is-white
                    is-full
                    @click="startNewTest"
                >
                    Нет, начать тест сначала
                </ui-button>
            </div>
        </div>
        <template v-else>
            <progress-bar :value="progress" />
            <SurveyComponent :model="survey" />
        </template>
    </div>
</template>

<style scoped lang="scss">
.survey {
    min-height: 100vh;
    background-color: $white-darkest;
    z-index: 1;

    &__loading {
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

    &__loader {
        margin-left: 28px;
    }

    &__text {
        text-align: center;
    }

    &__offer {
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

    &__offer-text {
        font-size: $fz-normal;
    }

    &__buttons-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 48px;
    }

    &__button:not(:last-child) {
        margin-bottom: $sp4;
    }
}
</style>
