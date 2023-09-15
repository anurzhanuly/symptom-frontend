<script lang="ts" setup>
import UiButton from '@/ui/UiButton.vue';
</script>

<template>
    <div class="buttons">
        <h2 class="buttons__title">Пройти опрос</h2>
        <ui-button
            is-full
            @click="$router.push({ name: 'agreement' })"
        >
            Без регистрации
        </ui-button>
        <ui-button
            is-full
            is-white
            @click="$router.push({ name: 'client-test-auth' })"
        >
            Для врача
        </ui-button>
    </div>
</template>

<style lang="scss" scoped>
.button {
    margin-bottom: 16px;
    border-radius: 3px;
    padding: 17px;
}
.button:not(:last-child) {
    margin-bottom: 16px;
    background-color: #2196f3;
}
.buttons {
    display: flex;
    flex-direction: column;
    padding: 32px 16px;

    &__title {
        text-align: center;
        margin-bottom: 24px;
    }
}
</style>
