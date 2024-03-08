<script setup lang="ts">
import UiButton from '@/ui/UiButton.vue';

defineProps({
    routeName: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div>
        <header class="header">
            <ui-button
                icon="pi pi-angle-left"
                @click="$router.push({ name: routeName })"
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
    align-items: center;

    &__logo {
        max-width: 100px;
        height: 100%;
    }
}

.pi {
    font-weight: bold;
}
</style>
