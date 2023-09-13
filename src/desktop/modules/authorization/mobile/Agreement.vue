<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSurveyStore } from '@desktop/modules/survey/store/survey.store';
import { PRIVACY_POLICY, TERMS_OF_USE } from '@/utils/agreement';

import UiButton from '@/ui/UiButton.vue';
import Sidebar from 'primevue/sidebar';

const surveyStore = useSurveyStore();
const { isLoading, questions } = storeToRefs(surveyStore);

const termsOfUse = ref(false);
const privacyPolicy = ref(false);

onMounted(() => {
    if (!questions.value) {
        surveyStore.getQuestionsData();
    }
});
</script>

<template>
    <div class="agreement">
        <div class="agreement__content">
            <h3 class="agreement__title">Условия использования:</h3>
            <ul class="agreement__info-block">
                <li class="agreement__info">
                    <strong>
                        Данный опрос и результаты не является диагностикой,
                        лечением и заменой врача.
                    </strong>
                    <br />
                    Оно предназначено исключительно для общего сведения и не
                    является квалифицированным медицинским заключением.
                </li>
                <li class="agreement__info">
                    <strong>
                        Это обследование не предназначено для экстренных
                        случаев.
                    </strong>
                    <br />
                    В случае неотложного состояния немедленно позвоните 103
                </li>
                <li class="agreement__info">Мне есть 18 лет</li>
            </ul>
            <hr class="agreement__separator" />
            <div class="agreement-check">
                Я прочитал(а) и принимаю
                <strong @click="termsOfUse = true">
                    Условия использования.
                </strong>
                <br />
                Я соглашаюсь на использование информации о моем здоровье для
                прохождения опроса.
                <br />
                Полная информация доступна в
                <strong @click="privacyPolicy = true"
                    >Политике конфиденциальности.
                </strong>
            </div>
            <ui-button
                is-full
                @click="$router.push({ name: 'survey' })"
            >
                Принять и начать опрос
            </ui-button>
        </div>
    </div>

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

<style scoped lang="scss">
.agreement {
    padding: 12px;
    &__content {
        padding: 16px;
    }
    &__title {
        margin-bottom: 16px;
    }
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
.button {
    margin: 12px 0;
}
.agreement__separator {
    margin: 16px 0;
}
</style>
