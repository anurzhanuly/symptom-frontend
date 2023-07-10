<template>
    <component :is="components.HeaderBar" />
    <component :is="components.MainBar" />
    <component :is="components.AboutProject" />
    <component :is="components.Solutions" />
    <component :is="components.Advantages" />
    <component :is="components.Team" />
    <component :is="components.FooterBar" />
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';

const isMobile = window.innerWidth < 800;

const components = shallowRef<any>({
    HeaderBar: null,
    MainBar: null,
    AboutProject: null,
    Solutions: null,
    Advantages: null,
    Team: null,
    FooterBar: null,
});

onMounted(async () => {
    switch (isMobile) {
        case true:
            components.value = {
                HeaderBar: (await import('./mobile/HeaderBar.vue')).default,
                MainBar: (await import('./mobile/MainBar.vue')).default,
                AboutProject: (await import('./mobile/AboutProject.vue'))
                    .default,
                Solutions: (await import('./mobile/Solutions.vue')).default,
                Advantages: (await import('./mobile/Advantages.vue')).default,
                Team: (await import('./mobile/Team.vue')).default,
                FooterBar: (await import('./mobile/FooterBar.vue')).default,
            };
            break;
        case false:
            components.value = {
                HeaderBar: (await import('./desktop/HeaderBar.vue')).default,
                MainBar: (await import('./desktop/MainBar.vue')).default,
                AboutProject: (await import('./desktop/AboutProject.vue'))
                    .default,
                Solutions: (await import('./desktop/Solutions.vue')).default,
                Advantages: (await import('./desktop/Advantages.vue')).default,
                Team: (await import('./desktop/Team.vue')).default,
                FooterBar: (await import('./desktop/FooterBar.vue')).default,
            };
            break;
        default:
            console.error('Unable to determine device type');
            break;
    }
});
</script>
