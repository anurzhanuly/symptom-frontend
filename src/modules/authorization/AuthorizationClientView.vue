<script setup lang="ts">
import Authorization from './components/Authorization.vue';
import ClientRegistration from './components/popup/ClientRegistration.vue';

import { useAuthorizationStore } from './store/authorization.store';
import { validateLogin } from '@/utils/validation';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { useDialog } from 'primevue/usedialog';
import PButton from 'primevue/button';
import InputText from 'primevue/inputtext';
import PPassword from 'primevue/password';
import InlineMessage from 'primevue/inlinemessage';

const authorizationStore = useAuthorizationStore();

const { isWrong } = storeToRefs(authorizationStore);

const dialog = useDialog();
const password = ref('');
const email = ref('');

function checkClient(): void {
    if (validateLogin(email.value, password.value)) {
        authorizationStore.postLoginClient(email.value, password.value);
    }
}

function resetPassword() {
    // TODO reset password
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
</script>

<template>
    <authorization>
        <div class="authorization-client">
            <form class="authorization-form p-fluid">
                <img
                    alt="Symptom logo"
                    src="@/assets/logo-auth.png"
                >
                <div>
                    <h4>Почта <span>*</span></h4>
                    <input-text v-model="email" />
                </div>
                <div>
                    <h4>Пароль <span>*</span></h4>
                    <p-password
                        v-model="password"
                        :feedback="false"
                        toggle-mask
                    />
                </div>

                <inline-message v-if="isWrong">
                    Неверный пароль или почта
                </inline-message>
                <p-button
                    label="Вход"
                    @click="checkClient"
                />
                <p-button
                    label="Забыли пароль?"
                    link
                    @click="resetPassword"
                />
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
    padding: 27%;
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

.authorization-form .p-button {
    margin-top: 15px;
    height: 45px;
    font-weight: 600;
    border-radius: 5px;
    width: 100%;
}

.registration-client {
    display: flex;
    justify-content: center;
    align-items: center;
}

.registration-client strong {
    color: #2196f3;
    cursor: pointer;
}

@media only screen and (max-width: 750px) {
    .authorization-client {
        padding: 10%;
    }
}
</style>
