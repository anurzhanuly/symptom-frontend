<template>
    <component :is="components.headerComponent" />
</template>

<script setup lang="ts">
import { onMounted, DefineComponent, shallowRef } from 'vue';

interface Components {
    headerComponent: DefineComponent | null;
}

const isMobile = shallowRef(window.matchMedia('(max-width: 800px)').matches);

const components = shallowRef<Components>({
    headerComponent: null,
});

onMounted(async () => {
    switch (isMobile.value) {
        case true:
            components.value = {
                headerComponent: (await import('./mobile/Header.vue')).default,
            };
            break;
        case false:
            components.value = {
                headerComponent: (await import('./desktop/Header.vue')).default,
            };
            break;
        default:
            console.error('Unable to determine device type');
            break;
    }
});
</script>
