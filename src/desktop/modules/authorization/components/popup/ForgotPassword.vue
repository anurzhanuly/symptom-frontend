<script setup lang="ts">
import { inject, ref } from 'vue';

import InlineMessage from 'primevue/inlinemessage';
import UiButton from '@/ui/UiButton.vue';
import InputText from 'primevue/inputtext';
import PPassword from 'primevue/password';
import { validatePhone } from '@/utils/validation';

const password = ref('');
const passwordConfirm = ref('');
const phoneNumber = ref('');

const isPassword = ref(true);
const isConfirmPassword = ref(true);
const isCorrectPhoneNumber = ref(true);

const dialogRef = inject<any>('dialogRef');

function validateData(): boolean {
    if (!validatePhone(phoneNumber.value)) {
        isCorrectPhoneNumber.value = false;

        setTimeout(() => {
            isCorrectPhoneNumber.value = true;
        }, 3000);

        return false;
    }

    if (!password.value) {
        isPassword.value = false;

        setTimeout(() => {
            isPassword.value = true;
        }, 3000);

        return false;
    }

    if (password.value !== passwordConfirm.value) {
        isConfirmPassword.value = false;

        setTimeout(() => {
            isConfirmPassword.value = true;
        }, 3000);

        return false;
    }

    return true;
}

function resetPassword() {
    if (validateData()) {
        dialogRef.value.close();

        phoneNumber.value = validatePhone(phoneNumber.value);

        console.log(`phone:${phoneNumber.value} password:${password.value}`);
    }
}
</script>

<template>
    <form
        class="form p-fluid"
        @keyup.enter="resetPassword"
    >
        <div class="form__tooltip">
            <inline-message v-if="!isCorrectPhoneNumber">
                Некорректный номер телефона
                <br />
                Пожалуйста, введите номер в формате 877712345678
            </inline-message>
            <inline-message v-if="!isPassword">
                Поле 'Пароль' обязательно для заполнения
            </inline-message>
            <inline-message v-if="!isConfirmPassword">
                Пароли не совпадают!
            </inline-message>
        </div>
        <div>
            <h4 class="form__title">
                Номер телефона <span class="form__element">*</span>
            </h4>
            <input-text
                v-model="phoneNumber"
                :use-grouping="false"
            />
        </div>
        <div>
            <h4 class="form__title">
                Новый пароль <span class="form__element">*</span>
            </h4>

            <p-password
                v-model="password"
                toggle-mask
                :feedback="false"
            />
        </div>
        <div>
            <h4 class="form__title">
                Подтверждение пароля <span class="form__element">*</span>
            </h4>

            <p-password
                v-model="passwordConfirm"
                toggle-mask
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
    &__tooltip {
        width: 50%;
        margin: 0 auto;
    }

    &__title {
        color: #3f3f3f;
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
