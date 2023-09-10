<script lang="ts" setup>
import PButton from 'primevue/button';
import Authorization from '@mobile/modules/authorization/components/Authorization.vue';
import UiButton from '@/ui/UiButton.vue';
</script>

<template>
    <authorization>
        <div class="buttons">
            <h2 class="buttons__title">Пройти опрос</h2>
            <ui-button
                class="buttons__item"
                is-big
                @click="$router.push({ name: 'agreement' })"
            >
                Без регистрации
            </ui-button>
            <ui-button
                is-white
                is-big
                class="buttons__item"
                @click="$router.push({ name: 'client-test-auth' })"
            >
                Для врача
            </ui-button>
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
