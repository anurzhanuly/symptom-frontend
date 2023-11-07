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
            <form class="authorization-doctor__form p-fluid">
                <img
                    class="authorization-doctor__logo"
                    alt="Symptom logo"
                    src="@/assets/logo-auth.png"
                />

                <h4 class="authorization-doctor__text">
                    Телефон
                    <span class="authorization-doctor__tag">*</span>
                </h4>
                <input-text
                    v-model="login"
                    type="mail"
                />

                <h4 class="authorization-doctor__text">
                    Пароль
                    <span class="authorization-doctor__tag">*</span>
                </h4>
                <p-password
                    v-model="password"
                    toggle-mask
                    :feedback="false"
                />

                <inline-message
                    v-if="isWrong"
                    class="authorization-doctor__error"
                >
                    Неверный пароль или почта
                </inline-message>
                <ui-button
                    is-full
                    is-big
                    is-blue
                    class="authorization-doctor__button"
                    @click="checkDoctor"
                >
                    Вход
                </ui-button>
            </form>
        </div>
    </authorization>
</template>

<style scoped lang="scss">
.authorization-doctor {
    padding: $sp4 $sp6;

    &__logo {
        margin-bottom: $sp5;
    }

    &__tag {
        color: $red;
    }

    &__text {
        color: $black;
        margin: $sp2 0;
    }

    &__button {
        margin-top: $sp4;
    }

    &__error {
        margin: $sp3 0;
    }
}
</style>
