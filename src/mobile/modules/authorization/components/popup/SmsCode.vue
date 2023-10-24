<script setup lang="ts">
import { inject, ref } from 'vue';

import InlineMessage from 'primevue/inlinemessage';
import UiButton from '@/ui/UiButton.vue';
import UiInput from '@/ui/UiInput.vue';

const smsCode = ref('');
const dialogRef = inject<any>('dialogRef');

const isCodeValid = ref(true);

function submitCode() {
    if (!validateSmsCode(smsCode.value)) {
        isCodeValid.value = false;

        setTimeout(() => {
            isCodeValid.value = true;
        }, 3000);
    } else {
        dialogRef.value.close();
    }
}

function validateSmsCode(sms: string) {
    const SMS_PATTERN = /^[0-9]{6}$/;

    return SMS_PATTERN.test(sms);
}
</script>

<template>
    <div class="sms-code">
        <form class="sms-code__form p-fluid">
            <p class="sms-code__text">
                Мы отправили код для подтверждения на ваш телефон <br />
                Пожалуйста, введите 6-значный код
            </p>
            <inline-message
                v-if="!isCodeValid"
                class="sms-code__tooltip"
            >
                Неверный код
            </inline-message>
            <ui-input
                v-model="smsCode"
                type="number"
                class="sms-code__input"
            ></ui-input>
            <ui-button
                is-blue
                is-full
                @click="submitCode"
            >
                Отправить
            </ui-button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.sms-code {
    &__text {
        font-size: $fz-normal;
    }

    &__input {
        margin-bottom: $sp3;
    }

    &__tooltip {
        margin-bottom: $sp3;
    }
}
</style>
