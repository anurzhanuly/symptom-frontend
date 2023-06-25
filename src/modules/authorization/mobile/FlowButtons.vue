<template>
    <div class="buttons">
        <h2 class="buttons__title">Пройти опрос</h2>
        <p-button
            class="buttons__item"
            @click="
                $router.push({
                    name: 'agreement',
                    params: { withoutRegister: 1 },
                })
            "
            v-html="'Для себя <br>(без регистрации)'"
        />
        <p-button
            class="buttons__item"
            label="Для врача"
            outlined
            @click="
                $router.push({
                    name: 'agreement',
                    params: { withoutRegister: 0 },
                })
            "
        />
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
        margin-bottom: 24px;
    }

    &__item {
        margin-bottom: 16px;
        justify-content: center;
        padding: 16px 0;
    }
}
</style>
