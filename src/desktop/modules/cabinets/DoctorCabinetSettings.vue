<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import { postPassword } from '@desktop/modules/cabinets/services/cabinets.refbooks';
import PButton from 'primevue/button';
import { success, error } from '@/utils/toast';
import BaseHeader from '@/desktop/components/BaseHeader.vue';
import UiButton from '@/ui/UiButton.vue';

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
    <base-header></base-header>
    <div class="settings">
        <ui-button
            icon="pi pi-angle-left header__button"
            is-white
            class="settings__button"
            @click="$router.push({ name: '/doctor-cabinet' })"
        >
            Назад
        </ui-button>
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

    &__button {
        margin-bottom: $sp4;
    }
}
</style>
