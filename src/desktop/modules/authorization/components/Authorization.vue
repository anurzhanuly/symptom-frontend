<script setup lang="ts">
import BaseCarousel from '@desktop/components/BaseCarousel.vue';
import UiButton from '@/ui/UiButton.vue';
</script>

<template>
    <div class="authorization">
        <div class="authorization-onboarding">
            <base-carousel />
        </div>
        <div class="authorization-main">
            <ui-button
                class="authorization-button"
                icon="pi pi-angle-left header__button"
                link
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

<style scoped>
.authorization {
    display: flex;
    justify-content: space-between;
}

.authorization-main {
    padding-top: 40px;
}

.authorization-onboarding,
.authorization-main {
    width: 50%;
}

@media only screen and (max-width: 750px) {
    .authorization-onboarding {
        display: none;
    }

    .authorization-main {
        width: 100%;
        padding-top: 20px;
    }
}
</style>
