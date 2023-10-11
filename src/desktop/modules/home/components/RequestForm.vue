<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import UiButton from '@/ui/UiButton.vue';
import { success, warn } from '@/utils/toast';
import { postNpsRequest } from '@mobile/modules/home/services/home.refbooks';

const name = ref('');
const workplace = ref('');
const phone = ref('');

async function sendRequest() {
    if (!name.value) {
        warn('Ошибка', 'Введите имя');
        return;
    }

    if (!workplace.value) {
        warn('Ошибка', 'Введите место работы или любое слово');
        return;
    }

    if (!phone.value) {
        warn('Ошибка', 'Введите телефон');
        return;
    }

    const res = await postNpsRequest({
        name: name.value,
        workplace: workplace.value,
        phone: phone.value,
    });

    if (res) {
        success('Успешно', 'Запрос отправлен');
        name.value = '';
        workplace.value = '';
        phone.value = '';
    }
}
</script>

<template>
    <div class="questions">
        <div class="questions-actions p-fluid">
            <h2 class="questions__title">Остались вопросы?</h2>
            <p class="questions__text">
                Оставьте контактные данные, чтобы мы могли перезвонить вам и
                проконсультровать
            </p>
            <input-text
                v-model="name"
                placeholder="Ваше имя и фамилия"
                class="questions__input"
            />
            <input-text
                v-model="workplace"
                placeholder="Место работы"
                class="questions__input"
            />
            <input-text
                v-model="phone"
                placeholder="Номер телефона"
                class="questions__input"
            />
            <ui-button
                is-blue
                is-full
                @click="sendRequest"
            >
                Отправить
            </ui-button>
        </div>
        <img
            class="questions__img"
            alt="logo"
            src="@/assets/onboarding/onboard1.png"
        />
    </div>
</template>

<style lang="scss" scoped>
.questions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(
        60deg,
        $blue-light 15.72%,
        $blue-lighter 80.75%
    );
    padding: $sp6 190px;

    &__img {
        width: 50%;
        height: 100%;
    }

    &__title {
        font-size: $fz-huge;
        line-height: $lh-bigger;
        color: $white;
        font-weight: 600;
    }

    &__text {
        font-size: $fz-normal;
        color: $white;
    }

    &__input {
        margin-bottom: $sp4;
        padding: $sp3 $sp2;
    }
}
</style>
