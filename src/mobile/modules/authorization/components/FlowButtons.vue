<script lang="ts" setup>
import router from '@/mobile/router';
import UiButton from '@/ui/UiButton.vue';
import { SURVEY_FLOW, DOCTOR_ID } from '@/utils/localStorageKeys';

localStorage.removeItem(SURVEY_FLOW);
localStorage.removeItem(DOCTOR_ID);

function chooseDoctorFlow() {
    localStorage.setItem(SURVEY_FLOW, 'doctor');
    router.push({ name: 'choose-survey-type' });
}
</script>

<template>
    <div class="buttons">
        <h2 class="buttons__title">Пройти опрос</h2>
        <ui-button
            is-big
            is-full
            is-blue
            class="buttons__item"
            @click="$router.push({ name: 'choose-survey-type' })"
        >
            Без регистрации
        </ui-button>
        <ui-button
            is-big
            is-full
            is-white
            class="buttons__item"
            @click="chooseDoctorFlow"
        >
            Для врача
        </ui-button>
    </div>
</template>

<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: column;
    padding: 32px 16px;

    &__title {
        font-size: $fz-bigger;
        text-align: center;
        margin-bottom: 24px;
    }

    &__item:not(:last-child) {
        margin-bottom: 16px;
    }
}
</style>
