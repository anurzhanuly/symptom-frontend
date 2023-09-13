<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
const components = shallowRef<any>({
    agreementComponent: null,
    headerComponent: null,
});

onMounted(async () => {
    components.value = {
        agreementComponent: (await import('./desktop/Agreement.vue')).default,
    };
});
</script>

<template>
    <component :is="components.headerComponent" />
    <component :is="components.agreementComponent" />
</template>
