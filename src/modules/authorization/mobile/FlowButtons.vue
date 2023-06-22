<template>
    <div class="buttons">
        <h2 class="buttons__title">Пройти опрос</h2>
        <p-button
            class="buttons__item"
            v-html="'Для себя <br>(без регистрации)'"
        />
        <p-button label="Назад" outlined />
    </div>
</template>

<script lang="ts" setup>
import PButton from 'primevue/button';
</script>

<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: column;
    padding: 32px 16px;

    &__title {
        text-align: center;
        margin-bottom: 12px;
    }

    &__item {
        margin-bottom: 12px;
    }
}
</style>
