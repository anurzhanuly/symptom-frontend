<script setup lang="ts">
import { inject, ref } from 'vue';

import InlineMessage from 'primevue/inlinemessage';
import UiButton from '@/ui/UiButton.vue';
import InputText from 'primevue/inputtext';
import PPassword from 'primevue/password';

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const isEmail = ref(true);
const isCorrectEmail = ref(true);
const isPassword = ref(true);
const isConfirmPassword = ref(true);

const dialogRef = inject<any>('dialogRef');

function resetPassword() {
    if (validateData()) {
        dialogRef.value.close();
        console.log(`login:${email.value} password:${password.value}`);
    }
}

function validateData(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    isEmail.value = true;
    isCorrectEmail.value = true;
    isPassword.value = true;
    isConfirmPassword.value = true;

    if (!email.value) {
        isEmail.value = false;
        return false;
    }

    if (!emailRegex.test(email.value)) {
        isCorrectEmail.value = false;
        return false;
    }

    if (!password.value) {
        isPassword.value = false;
        return false;
    }

    if (password.value !== passwordConfirm.value) {
        isConfirmPassword.value = false;
        return false;
    }

    return true;
}
</script>

<template>
    <form class="form p-fluid">
        <div>
            <h4 class="form__title">
                Почта <span class="form__element">*</span>
            </h4>
            <inline-message v-if="!isEmail">
                Поле 'Почта' обязательно для заполнения
            </inline-message>
            <inline-message v-if="!isCorrectEmail">
                Не корректная почта
            </inline-message>
            <input-text v-model="email" />
        </div>
        <div>
            <h4 class="form__title">
                Новый пароль <span class="form__element">*</span>
            </h4>
            <inline-message v-if="!isPassword">
                Поле 'Пароль' обязательно для заполнения
            </inline-message>
            <p-password
                v-model="password"
                toggle-mask
            />
        </div>
        <div>
            <h4 class="form__title">
                Подтверждение пароля <span class="form__element">*</span>
            </h4>
            <inline-message v-if="!isConfirmPassword">
                Пароли не совпадают!
            </inline-message>
            <p-password
                v-model="passwordConfirm"
                :feedback="false"
            />
        </div>
        <ui-button
            is-blue
            is-full
            class="form__button"
            @click="resetPassword"
        >
            Отправить
        </ui-button>
    </form>
</template>

<style scoped lang="scss">
.form {
    &__title {
        color: #3f3f3f;
        font-weight: 400;
        margin: 8px 0;
    }

    &__element {
        color: #d0312d;
    }

    &__button {
        margin-top: 8px;
    }
}
</style>
