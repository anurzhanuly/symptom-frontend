<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';

const components = shallowRef<any>({
    headerComponent: null,
    buttonsComponent: null,
});

onMounted(async () => {
    components.value = {
        headerComponent: null,
        buttonsComponent: (await import('./desktop/FlowButtons.vue')).default,
    };
    localStorage.removeItem('doctorId'); //TODO Странное место для удаления, потом подумать как лучше
});
</script>

<template>
    <component :is="components.headerComponent" />
    <component :is="components.buttonsComponent" />
</template>
