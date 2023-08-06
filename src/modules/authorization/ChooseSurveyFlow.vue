<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';

const isMobile = window.innerWidth < 800;

const components = shallowRef<any>({
    headerComponent: null,
    buttonsComponent: null,
});

onMounted(async () => {
    switch (isMobile) {
        case true:
            components.value = {
                headerComponent: (await import('./mobile/Header.vue')).default,
                buttonsComponent: (await import('./mobile/FlowButtons.vue'))
                    .default,
            };
            break;
        case false:
            components.value = {
                headerComponent: (await import('./desktop/Header.vue')).default,
                buttonsComponent: (await import('./mobile/FlowButtons.vue'))
                    .default,
            };
            break;
        default:
            console.error('Unable to determine device type');
            break;
    }

    localStorage.removeItem('doctorId'); //TODO Странное место для удаления, потом подумать как лучше
});
</script>

<template>
    <component :is="components.headerComponent" />
    <component :is="components.buttonsComponent" />
</template>
