<script setup lang="ts">
import UiButton from '@/ui/UiButton.vue';
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
                src="@/assets/logo-auth.png"
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

.pi {
    font-weight: bold;
}
</style>
