<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import { postPassword } from '@mobile/modules/cabinets/services/cabinets.refbooks';
import PButton from 'primevue/button';
import { success, error } from '@mobile/utils/toast';

const newPassword = ref('');

async function changePassword() {
    const res = await postPassword(newPassword.value);

    if (res) {
        success('Успешно', 'Пароль изменён');
    } else {
        error('Ошибка', 'Попробуйте снова');
    }
}
</script>

<template>
    <div class="settings">
        <h2 class="settings__header">Смена пароля</h2>
        <div>
            <input-text
                v-model="newPassword"
                placeholder="Новый пароль"
            />
            <p-button
                label="Изменить"
                @click="changePassword"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    padding: 30px 16px 30px;

    &__header {
        margin-bottom: 30px;
    }
}
</style>
