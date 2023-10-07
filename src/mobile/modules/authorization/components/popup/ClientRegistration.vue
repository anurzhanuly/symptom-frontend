<script setup lang="ts">
import { useAuthorizationStore } from '../../store/authorization.store';
import { success } from '@/utils/toast';
import { useRouter } from 'vue-router';
import { inject, ref } from 'vue';

import InlineMessage from 'primevue/inlinemessage';
import PButton from 'primevue/button';
import InputText from 'primevue/inputtext';
import PPassword from 'primevue/password';

const authorizationStore = useAuthorizationStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phoneNumber = ref('');
const password = ref('');
const passwordConfirm = ref('');

const isFirstName = ref(true);
const isLastName = ref(true);
const isCorrectEmail = ref(true);
const isPhoneNumber = ref(true);
const isCorrectPhoneNumber = ref(true);
const isPassword = ref(true);
const isConfirmPassword = ref(true);

const router = useRouter();
const dialogRef = inject<any>('dialogRef');

async function clientRegistration() {
    if (validateRegistratition()) {
        const token = await authorizationStore.clientRegistrationData({
            password: password.value,
            c_password: passwordConfirm.value,
            type: 'patient',
            first_name: firstName.value,
            last_name: lastName.value,
            phone: phoneNumber.value,
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

function validateRegistratition(): boolean {
    const PHONE_PATTERN = /^(8|\+7|7)[0-9]{10}$/;

    isFirstName.value = true;
    isLastName.value = true;
    isCorrectEmail.value = true;
    isPhoneNumber.value = true;
    isCorrectPhoneNumber.value = true;
    isPassword.value = true;
    isConfirmPassword.value = true;

    if (!firstName.value || firstName.value.length < 2) {
        isFirstName.value = false;
        return false;
    }

    if (!lastName.value || firstName.value.length < 2) {
        isLastName.value = false;
        return false;
    }

    if (!phoneNumber.value) {
        isPhoneNumber.value = false;
        return false;
    }

    // if (!phonePattern.test(phoneNumber.value)) {
    //     isCorrectPhoneNumber.value = false;
    //     return false;
    // }

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
                <inline-message v-if="!isPhoneNumber">
                    Поле 'Номер телефона' обязательно для заполнения
                </inline-message>
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
                />
            </div>
            <div>
                <h4>Подтверждение пароля <span>*</span></h4>
                <inline-message v-if="!isConfirmPassword">
                    Пароли не совпадают!
                </inline-message>
                <p-password
                    v-model="passwordConfirm"
                    :feedback="false"
                />
            </div>

            <p-button
                label="Зарегистрироваться"
                @click="clientRegistration"
            />
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

.authorization-form .p-button {
    margin-top: 15px;
    height: 45px;
    font-weight: 600;
    border-radius: 5px;
    width: 100%;
}
</style>
