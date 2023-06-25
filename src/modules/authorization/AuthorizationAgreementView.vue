<template>
    <component :is="components.agreementComponent" />
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';

const isMobile = window.innerWidth < 800;

const components = shallowRef<any>({
    agreementComponent: null,
});

onMounted(async () => {
    switch (isMobile) {
        case true:
            components.value = {
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
