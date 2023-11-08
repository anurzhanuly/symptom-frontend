<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { success } from '@/utils/toast';
import { validatePhone } from '@/utils/validation';
import { useAuthorizationStore } from '../../store/authorization.store';
import { useDialog } from 'primevue/usedialog';

import SmsCode from './SmsCode.vue';
import InlineMessage from 'primevue/inlinemessage';
import UiButton from '@/ui/UiButton.vue';
import InputText from 'primevue/inputtext';
import PPassword from 'primevue/password';

const authorizationStore = useAuthorizationStore();

const dialog = useDialog();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phoneNumber = ref('');
const password = ref('');
const passwordConfirm = ref('');

const isFirstName = ref(true);
const isLastName = ref(true);
const isCorrectPhoneNumber = ref(true);
const isPassword = ref(true);
const isConfirmPassword = ref(true);

const registrationError = ref(false);

const router = useRouter();
const dialogRef = inject<any>('dialogRef');

function validateRegistratition(): boolean {
    if (!firstName.value || firstName.value.length < 2) {
        isFirstName.value = false;

        setTimeout(() => {
            isFirstName.value = true;
        }, 3000);

        return false;
    }

    if (!lastName.value || firstName.value.length < 2) {
        isLastName.value = false;

        setTimeout(() => {
            isLastName.value = true;
        }, 3000);

        return false;
    }

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

async function clientRegistration() {
    if (validateRegistratition()) {
        const token = await authorizationStore.clientRegistrationData({
            password: password.value,
            c_password: passwordConfirm.value,
            type: 'patient',
            first_name: firstName.value,
            last_name: lastName.value,
            phone: validatePhone(phoneNumber.value),
            email: email.value,
        });

        if (token) {
            const dateOfToken = Date.now().toString();
            localStorage.setItem('clientToken', JSON.stringify(token));
            localStorage.setItem('tokenDate', dateOfToken);

            success('Аккаунт создан', `Добро пожаловать ${firstName.value}`);

            dialogRef.value.close();
            router.push('/client-cabinet');
        }

        if (!token) {
            registrationError.value = true;
        }
    }
}
</script>

<template>
    <div>
        <form class="registration-form p-fluid">
            <div>
                <inline-message v-if="registrationError">
                    Пользователь с такими данными уже зарегистрирован
                </inline-message>
                <h4 class="registration-form__title">
                    Имя
                    <span class="registration-form__indicator">*</span>
                </h4>
                <inline-message v-if="!isFirstName">
                    Поле 'Имя' обязательно для заполнено
                </inline-message>
                <input-text v-model="firstName" />
            </div>
            <div>
                <h4 class="registration-form__title">
                    Фамилия
                    <span class="registration-form__indicator">*</span>
                </h4>
                <inline-message v-if="!isLastName">
                    Поле 'Фамилия' обязательно для заполнено
                </inline-message>
                <input-text v-model="lastName" />
            </div>
            <div>
                <h4 class="registration-form__title">Почта</h4>
                <input-text v-model="email" />
            </div>
            <div>
                <h4 class="registration-form__title">
                    Номер телефона
                    <span class="registration-form__indicator">*</span>
                </h4>
                <inline-message v-if="!isCorrectPhoneNumber">
                    Не корректный номер телефона
                </inline-message>
                <input-text v-model="phoneNumber" />
            </div>
            <div>
                <h4 class="registration-form__title">
                    Пароль
                    <span class="registration-form__indicator">*</span>
                </h4>
                <inline-message v-if="!isPassword">
                    Поле 'Пароль' обязательно для заполнения
                </inline-message>
                <p-password
                    v-model="password"
                    toggle-mask
                    :feedback="false"
                />
            </div>
            <div>
                <h4 class="registration-form__title">
                    Подтверждение пароля
                    <span class="registration-form__indicator">*</span>
                </h4>
                <inline-message v-if="!isConfirmPassword">
                    Пароли не совпадают!
                </inline-message>
                <p-password
                    v-model="passwordConfirm"
                    toggle-mask
                    :feedback="false"
                />
            </div>
            <ui-button
                is-full
                is-blue
                is-big
                class="registration-form__button"
                @click="clientRegistration"
            >
                Зарегистрироваться
            </ui-button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.registration-form {
    &__title {
        color: $black;
        margin: $sp2 0;
    }

    &__indicator {
        color: $red;
    }

    &__button {
        margin-top: $sp4;
    }
}
</style>
