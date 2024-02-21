<script lang="ts" setup>
import Authorization from '@/desktop/modules/authorization/components/Authorization.vue';
import UiButton from '@/ui/UiButton.vue';
</script>

<template>
    <authorization>
        <div class="buttons">
            <h2 class="buttons__title">Пройти опрос</h2>
            <ui-button
                is-big
                is-blue
                class="buttons__item"
                @click="$router.push({ name: 'choose-survey-type' })"
            >
                Без регистрации
            </ui-button>
            <ui-button
                is-white
                is-big
                class="buttons__item"
                @click="$router.push({ name: 'choose-survey-type' })"
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
    padding: $sp6 $sp4;

    &__title {
        text-align: center;
        margin-bottom: $sp6;
        font-size: $fz-great;
    }

    &__item {
        margin-bottom: $sp4;
    }
}
</style>
