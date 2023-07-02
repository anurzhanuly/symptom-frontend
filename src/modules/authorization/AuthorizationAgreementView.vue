<template>
    <component :is="components.headerComponent" />
    <component :is="components.agreementComponent" />
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';

const isMobile = window.innerWidth < 800;

const components = shallowRef<any>({
    agreementComponent: null,
    headerComponent: null,
});

onMounted(async () => {
    switch (isMobile) {
        case true:
            components.value = {
                headerComponent: (await import('./mobile/Header.vue')).default,
                agreementComponent: (await import('./mobile/Agreement.vue'))
                    .default,
            };
            break;
        case false:
            components.value = {
                agreementComponent: (await import('./desktop/Agreement.vue'))
                    .default,
            };
            break;
        default:
            console.error('Unable to determine device type');
            break;
    }
});
</script>
