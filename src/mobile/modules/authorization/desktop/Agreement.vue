<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Authorization from '../components/Authorization.vue';
import { PRIVACY_POLICY, TERMS_OF_USE } from '@mobile/utils/agreement';
import { useSurveyStore } from '@mobile/modules/survey/store/survey.store';

import PButton from 'primevue/button';
import UiButton from '@mobile/ui/UiButton.vue';
import Card from 'primevue/card';
import Sidebar from 'primevue/sidebar';

const surveyStore = useSurveyStore();

const termsOfUse = ref(false);
const privacyPolicy = ref(false);
const { isLoading, questions } = storeToRefs(surveyStore);

onMounted(() => {
    if (!questions.value) {
        surveyStore.getQuestionsData();
    }
});
</script>

<template>
    <authorization>
        <div class="agreement">
            <card>
                <template #title>
                    <h3>Условия использования</h3>
                </template>
                <template #content>
                    <p class="agreement__title">Дорогой пациент!</p>
                    <ul class="agreement__info-block">
                        <li class="agreement__info">
                            <strong>
                                Данный опрос и результаты не является
                                диагностикой, лечением и заменой врача.
                            </strong>
                            <br />
                            Оно предназначено исключительно для общего сведения
                            и не является квалифицированным медицинским
                            заключением.
                        </li>
                        <li class="agreement__info">
                            <strong>
                                Это обследование не предназначено для экстренных
                                случаев.
                            </strong>
                            <br />
                            В случае неотложного состояния немедленно позвоните
                            103
                        </li>
                        <li class="agreement__info">Мне есть 18 лет</li>
                    </ul>
                    <hr class="agreement__separator" />
                    <div class="agreement-check">
                        Я прочитал(а) и принимаю
                        <strong @click="termsOfUse = true"
                            >Условия использования.
                        </strong>
                        <br />
                        <span
                            >Я соглашаюсь на использование информации о моем
                            здоровье для прохождения опроса. Полная информация
                            доступна в
                            <strong @click="privacyPolicy = true"
                                >Политике конфиденциальности.
                            </strong>
                        </span>
                    </div>
                    <ui-button
                        is-full
                        class="agreement-button"
                        @click="$router.push({ name: 'survey' })"
                    >
                        Принять и начать опрос
                    </ui-button>
                </template>
            </card>
        </div>
    </authorization>

    <sidebar
        v-model:visible="termsOfUse"
        position="right"
        style="width: 60%"
    >
        <h1>Условия использования</h1>
        <ol>
            <li
                v-for="rule in TERMS_OF_USE"
                :key="rule.title"
            >
                <strong>{{ rule.title }}</strong>
                <ol>
                    <li
                        v-for="subRule in rule.subRules"
                        :key="subRule?.title"
                    >
                        &ensp;{{ subRule?.title }}
                        <ol>
                            <li
                                v-for="nestedSubRule in subRule?.subRules"
                                :key="nestedSubRule?.title"
                            >
                                &ensp;&ensp;{{ nestedSubRule?.title }}
                            </li>
                        </ol>
                    </li>
                </ol>
            </li>
        </ol>
    </sidebar>
    <sidebar
        v-model:visible="privacyPolicy"
        position="right"
        style="width: 60%"
    >
        <h1>Политика в отношении обработки персональных данных</h1>
        <ol>
            <li
                v-for="rule in PRIVACY_POLICY"
                :key="rule.title"
            >
                <strong>{{ rule.title }}</strong>
                <ol>
                    <li
                        v-for="subRule in rule.subRules"
                        :key="subRule?.title"
                    >
                        &ensp;<strong>{{ subRule?.title }}</strong>
                        <ol>
                            <li
                                v-for="nestedSubRule in subRule?.subRules"
                                :key="nestedSubRule?.title"
                            >
                                &ensp;&ensp;{{ nestedSubRule?.title }}
                            </li>
                        </ol>
                    </li>
                </ol>
            </li>
        </ol>
    </sidebar>
</template>

<style scoped>
.agreement {
    padding: 12px;
}
.agreement__title {
    margin-bottom: 16px;
}
.agreement__info-block {
    margin-bottom: 16px;
}
.agreement__info:not(:last-child) {
    margin-bottom: 8px;
}
.agreement-check .p-checkbox {
    margin-right: 5px;
    margin-top: 12px;
}
.agreement-check strong {
    color: #1769aa;
    cursor: pointer;
}
.agreement-button {
    margin-top: 12px;
}
.agreement__separator {
    margin: 16px 0;
}
</style>
