<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import Authorization from './components/Authorization.vue';
import { useAuthorizationStore } from './store/authorization.store';
import { validateLogin, validatePhone } from '@/utils/validation';

import PPassword from 'primevue/password';
import InputText from 'primevue/inputtext';
import UiButton from '@/ui/UiButton.vue';

const authorizationStore = useAuthorizationStore();
const { isWrong } = storeToRefs(authorizationStore);

const password = ref('');
const login = ref('');

function checkDoctor(): void {
    if (validateLogin(login.value, password.value)) {
        authorizationStore.postLoginDoctor(
            validatePhone(login.value),
            password.value
        );
    }
}
</script>

<template>
    <authorization>
        <div class="authorization-doctor">
            <form class="authorization-form p-fluid">
                <img
                    alt="Symptom logo"
                    src="@/assets/logo-auth.png"
                />

                <h4>Телефон <span>*</span></h4>
                <input-text
                    v-model="login"
                    type="mail"
                />

                <h4>Пароль <span>*</span></h4>
                <p-password
                    v-model="password"
                    toggle-mask
                    :feedback="false"
                />

                <inline-message v-if="isWrong">
                    Неверный пароль или почта
                </inline-message>
                <ui-button
                    is-full
                    is-big
                    is-blue
                    class="authorization__button"
                    @click="checkDoctor"
                >
                    Вход
                </ui-button>
            </form>
        </div>
    </authorization>
</template>

<style scoped>
.authorization-doctor {
    padding: 16% 32%;
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

.authorization-form .p-inputtext {
    width: 100%;
    margin-top: 8px;
}

.authorization__button {
    margin-top: 15px;
}

@media only screen and (max-width: 750px) {
    .authorization-doctor {
        padding: 10%;
    }
}
</style>
