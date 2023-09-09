<script setup lang="ts">
import PButton from 'primevue/button';
import UiButton from '@mobile/ui/UiButton.vue';
</script>

<template>
    <div>
        <header class="header">
            <ui-button
                is-white
                link
                @click="$router.push('/')"
            >
                Назад
            </ui-button>
            <img
                alt="Symptom logo"
                class="header__logo"
                src="@mobile/assets/logo-auth.png"
            />
        </header>
    </div>
</template>

<style lang="scss" scoped>
.header {
    padding: 20px 16px;
    display: flex;
    justify-content: space-between;

    &__logo {
        max-width: 100px;
    }
}

.p-button {
    padding: 0;
}

.pi {
    font-weight: bold;
}
</style>
