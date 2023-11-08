<script setup lang="ts">
import BaseCarousel from '@desktop/components/BaseCarousel.vue';
import UiButton from '@/ui/UiButton.vue';
</script>

<template>
    <div class="authorization">
        <div class="authorization__onboarding">
            <base-carousel />
        </div>
        <div class="authorization__main">
            <ui-button
                class="authorization__button"
                icon="pi pi-angle-left header__button"
                @click="$router.push({ name: 'home' })"
            >
                Назад
            </ui-button>
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.authorization {
    display: flex;
    justify-content: space-between;

    &__onboarding {
        width: 50%;
    }

    &__main {
        padding-top: $sp6;
        width: 50%;
    }
}
</style>
