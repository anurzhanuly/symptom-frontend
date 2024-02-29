<script setup lang="ts">
import UiButton from '@/ui/UiButton.vue';
</script>

<template>
    <div>
        <header class="header">
            <ui-button
                is-white
                @click="$router.back"
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
    padding: $sp5 $sp4;
    display: flex;
    justify-content: space-between;
}
</style>
