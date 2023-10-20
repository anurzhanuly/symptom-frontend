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
            localStorage.setItem('clientToken', JSON.stringify(token));

            success('Аккаунт создан', `Добро пожаловать ${firstName.value}`);

            dialogRef.value.close();
            router.push('/client-cabinet');

            return;
        }

        dialogRef.value.close();
    }
}
</script>

<template>
    <div>
        <form class="authorization-form p-fluid">
            <div>
                <h4>Имя <span>*</span></h4>
                <inline-message v-if="!isFirstName">
                    Поле 'Имя' обязательно для заполнено
                </inline-message>
                <input-text v-model="firstName" />
            </div>
            <div>
                <h4>Фамилия <span>*</span></h4>
                <inline-message v-if="!isLastName">
                    Поле 'Фамилия' обязательно для заполнено
                </inline-message>
                <input-text v-model="lastName" />
            </div>
            <div>
                <h4>Почта</h4>
                <input-text v-model="email" />
            </div>
            <div>
                <h4>Номер телефона <span>*</span></h4>
                <inline-message v-if="!isCorrectPhoneNumber">
                    Не корректный номер телефона
                </inline-message>
                <input-text v-model="phoneNumber" />
            </div>
            <div>
                <h4>Пароль <span>*</span></h4>
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
                <h4>Подтверждение пароля <span>*</span></h4>
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
                class="button"
                @click="clientRegistration"
            >
                Зарегистрироваться
            </ui-button>
        </form>
    </div>
</template>

<style scoped>
.authorization-form span {
    color: #d0312d;
}

.authorization-form img {
    margin-bottom: 20px;
}

.authorization-form h4 {
    color: #3f3f3f;
    font-weight: 400;
    margin-top: 8px;
}

.authorization-form .p-inputtext,
.authorization-form .p-dropdown,
.authorization-form .p-password {
    margin-top: 8px;
    width: 100%;
}

.authorization-form .button {
    margin-top: 15px;
    height: 45px;
    font-weight: 600;
    border-radius: 5px;
    width: 100%;
}
</style>
