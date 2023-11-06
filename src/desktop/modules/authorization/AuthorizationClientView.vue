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
        <div class="authorization">
            <form class="authorization__form p-fluid">
                <img
                    class="authorization__logo"
                    alt="Symptom logo"
                    src="@/assets/logo-auth.png"
                />
                <div>
                    <h4 class="authorization__text">
                        Телефон
                        <span class="authorization__tag">*</span>
                    </h4>
                    <input-text v-model="login" />
                </div>
                <div>
                    <h4 class="authorization__text">
                        Пароль
                        <span class="authorization__tag">*</span>
                    </h4>
                    <p-password
                        v-model="password"
                        toggle-mask
                        :feedback="false"
                    />
                </div>

                <inline-message
                    v-if="isWrong"
                    class="authorization__dropdown"
                >
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

        <div class="registration">
            <p>
                Нет аккаунта? Вы можете
                <strong
                    class="registration__strong"
                    @click="clientRegistration"
                    >Зарегистрироваться</strong
                >
            </p>
        </div>
    </authorization>
</template>

<style scoped lang="scss">
.authorization {
    padding: $sp6 $sp4 $sp4;

    &__logo {
        margin-bottom: $sp5;
    }

    &__tag {
        color: $red;
    }

    &__text {
        color: $black;
        margin: $sp3 0;
    }

    &__dropdown {
        margin: $sp3 0;
    }

    &__button {
        margin-top: $sp4;
    }
}

.registration {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $sp4;

    &__strong {
        color: $blue-primary;
        cursor: pointer;
    }
}
</style>
