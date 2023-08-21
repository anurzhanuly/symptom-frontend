<script lang="ts" setup>
import PButton from 'primevue/button';
import Authorization from '@/modules/authorization/components/Authorization.vue';
</script>

<template>
    <authorization>
        <div class="buttons">
            <h2 class="buttons__title">Пройти опрос</h2>
            <p-button
                class="buttons__item"
                label="Без регистрации"
                @click="$router.push({ name: 'agreement' })"
            />
            <p-button
                class="buttons__item"
                label="Для врача"
                outlined
                @click="$router.push({ name: 'client-test-auth' })"
            />
        </div>
    </authorization>
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

    &__item {
        margin-bottom: 16px;
        justify-content: center;
        padding: 16px 0;
    }
}
</style>
