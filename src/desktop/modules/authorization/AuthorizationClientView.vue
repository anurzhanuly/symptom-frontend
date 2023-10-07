<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuthorizationStore } from './store/authorization.store';
import { validateLogin } from '@/utils/validation';

import Authorization from './components/Authorization.vue';
import ClientRegistration from './components/popup/ClientRegistration.vue';
import ForgotPassword from './components/popup/ForgotPassword.vue';

import { useDialog } from 'primevue/usedialog';
import InputText from 'primevue/inputtext';
import PPassword from 'primevue/password';
import InlineMessage from 'primevue/inlinemessage';
import UiButton from '@/ui/UiButton.vue';

const authorizationStore = useAuthorizationStore();

const { isWrong } = storeToRefs(authorizationStore);

const dialog = useDialog();
const password = ref('');
const login = ref('');

function checkClient(): void {
    if (validateLogin(login.value, password.value)) {
        authorizationStore.postLoginClient(login.value, password.value);
    }
}

function clientRegistration() {
    dialog.open(ClientRegistration, {
        props: {
            header: 'Регистрация',
            style: {
                width: '80%',
            },
            modal: true,
        },
    });
}

function resetPassword() {
    dialog.open(ForgotPassword, {
        props: {
            header: 'Введите новый пароль',
            style: {
                width: '70%',
            },
            modal: true,
        },
    });
}
</script>

<template>
    <authorization>
        <div class="authorization-client">
            <form class="authorization-form p-fluid">
                <img
                    alt="Symptom logo"
                    src="@/assets/logo-auth.png"
                />
                <div>
                    <h4>Телефон <span>*</span></h4>
                    <input-text v-model="login" />
                </div>
                <div>
                    <h4>Пароль <span>*</span></h4>
                    <p-password
                        v-model="password"
                        toggle-mask
                    />
                </div>

                <inline-message v-if="isWrong">
                    Неверный пароль или почта
                </inline-message>
                <ui-button
                    class="authorization__button"
                    is-full
                    is-big
                    is-blue
                    @click="checkClient"
                >
                    Вход
                </ui-button>
                <ui-button
                    class="authorization__button"
                    is-full
                    is-big
                    is-white
                    @click="resetPassword"
                >
                    Забыли пароль?
                </ui-button>
            </form>
        </div>

        <div class="registration-client">
            <p>
                Нет аккаунта? Вы можете
                <strong @click="clientRegistration">Зарегистрироваться</strong>
            </p>
        </div>
    </authorization>
</template>

<style scoped>
.authorization-client {
    padding: 24px 16px 16px;
}

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
.authorization-form .p-inline-message {
    margin-top: 8px;
    width: 100%;
}

.authorization__button {
    margin-top: 15px;
}

.registration-client {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

.registration-client strong {
    color: #2196f3;
    cursor: pointer;
}
</style>
