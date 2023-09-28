<script setup lang="ts">
import UiButton from './UiButton.vue';

defineProps({
    headerLogo: Boolean,
    buttonBack: Boolean,
    buttonRout: {
        type: String,
        default: '',
    },
    buttonText: {
        type: String,
        default: 'Назад',
    },
});
</script>

<template>
    <header class="header">
        <ui-button
            v-if="buttonBack"
            class="header__button button-back"
            icon="pi pi-angle-left"
            @click="$router.push({ name: buttonRout })"
        >
            {{ buttonText }}
        </ui-button>
        <img
            v-if="headerLogo"
            src="@/assets/logo-auth.png"
            alt="Symptom logo"
            class="header__logo"
        />
    </header>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__logo {
        width: 200px;
        height: 100%;
    }
}
</style>
