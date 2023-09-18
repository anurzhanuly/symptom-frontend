<script lang="ts" setup>
import UiButton from '@/ui/UiButton.vue';
</script>

<template>
    <div class="buttons">
        <h2 class="buttons__title">Пройти опрос</h2>
        <ui-button
            is-big
            is-full
            class="buttons__item"
            @click="$router.push({ name: 'agreement' })"
        >
            Без регистрации
        </ui-button>
        <ui-button
            is-big
            is-full
            is-white
            class="buttons__item"
            @click="$router.push({ name: 'client-test-auth' })"
        >
            Для врача
        </ui-button>
    </div>
</template>

<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: column;
    padding: 32px 16px;

    &__title {
        text-align: center;
        margin-bottom: 24px;
    }

    &__item:not(:last-child) {
        margin-bottom: 16px;
    }
}
</style>
