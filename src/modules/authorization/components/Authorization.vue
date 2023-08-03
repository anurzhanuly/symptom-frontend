<template>
    <div class="authorization">
        <div class="authorization-onboarding">
            <base-carousel />
        </div>
        <div class="authorization-main">
            <p-button
                icon="pi pi-angle-left header__button"
                label="Назад"
                link
                @click="$router.push({ name: 'home' })"
            />
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseCarousel from '@/components/BaseCarousel.vue';
import PButton from 'primevue/button';
</script>

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
