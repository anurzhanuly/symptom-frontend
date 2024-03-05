<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuthorizationStore } from './store/authorization.store';
import { validateLogin, validatePhone } from '@/utils/validation';

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
        authorizationStore.postLoginClient(
            validatePhone(login.value),
            password.value
        );
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
            <form class="authorization-client__form p-fluid">
                <img
                    class="authorization-client__logo"
                    alt="Symptom logo"
                    src="@/assets/logo-auth.png"
                />
                <div>
                    <h4 class="authorization-client__text">
                        Телефон
                        <span class="authorization-client__indicator">*</span>
                    </h4>
                    <input-text v-model="login" />
                </div>
                <div>
                    <h4 class="authorization-client__text">
                        Пароль
                        <span class="authorization-client__indicator">*</span>
                    </h4>
                    <p-password
                        v-model="password"
                        toggle-mask
                        :feedback="false"
                    />
                </div>

                <inline-message
                    v-if="isWrong"
                    class="authorization-client__error"
                >
                    Неверный пароль или почта
                </inline-message>
                <ui-button
                    class="authorization-client__button"
                    is-full
                    is-big
                    is-blue
                    @click="checkClient"
                >
                    Вход
                </ui-button>
                <ui-button
                    class="authorization-client__button"
                    is-full
                    is-big
                    is-white
                    @click="resetPassword"
                >
                    Забыли пароль?
                </ui-button>
            </form>
            <p class="authorization-client__register-text">Нет аккаунта?</p>
            <p class="authorization-client__register-text">
                Вы можете
                <span>
                    <strong
                        class="authorization-client__link"
                        @click="clientRegistration"
                    >
                        Зарегистрироваться
                    </strong>
                </span>
            </p>
        </div>
    </authorization>
</template>

<style scoped lang="scss">
.authorization-client {
    padding: $sp6 $sp4 $sp4;

    &__logo {
        margin-bottom: $sp5;
    }

    &__indicator {
        color: $red;
    }

    &__text {
        color: $black;
        margin: $sp3 0;
    }

    &__error {
        margin: $sp3 0;
    }

    &__button {
        margin-top: $sp4;
    }

    &__register-text {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: $sp4;
        white-space: pre; // Свойство для создания пробела внутри тега P
    }

    &__link {
        color: $blue-primary;
        cursor: pointer;
    }
}
</style>
