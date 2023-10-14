<script setup lang="ts">
import { inject, ref } from 'vue';

import InlineMessage from 'primevue/inlinemessage';
import UiButton from '@/ui/UiButton.vue';
import UiInput from '@/ui/UiInput.vue';

const code = ref('');
const dialogRef = inject<any>('dialogRef');

const isCode = ref(true);

function approve() {
    dialogRef.value.close();
}
</script>

<template>
    <div class="wrapper">
        <form class="approve__form p-fluid">
            <p class="approve__text">
                Мы отправили код для подтверждения на ваш телефон <br />
                Пожалуйста, введите 6-значный код
            </p>
            <inline-message v-if="!isCode">Код пароль неверный</inline-message>
            <ui-input
                type="number"
                :value="code"
                class="approve__input"
            ></ui-input>
            <ui-button
                is-blue
                is-full
                @click="approve"
            >
                Отправить
            </ui-button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.approve {
    &__text {
        font-size: $fz-normal;
    }

    &__input {
        margin-bottom: $sp3;
    }
}
</style>
