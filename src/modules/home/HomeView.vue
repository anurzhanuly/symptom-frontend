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
import { onMounted, DefineComponent, shallowRef } from 'vue';
import { useSurveyStore } from '@/modules/survey/store/survey.store';
import { storeToRefs } from 'pinia';

interface Components {
    HeaderBar: DefineComponent | null;
    MainBar: DefineComponent | null;
    AboutProject: DefineComponent | null;
    Solutions: DefineComponent | null;
    Advantages: DefineComponent | null;
    Team: DefineComponent | null;
    FooterBar: DefineComponent | null;
}

const isMobile = shallowRef(window.matchMedia('(max-width: 800px)').matches);
const surveyStore = useSurveyStore();
const { questions } = storeToRefs(surveyStore);

const components = shallowRef<Components>({
    HeaderBar: null,
    MainBar: null,
    AboutProject: null,
    Solutions: null,
    Advantages: null,
    Team: null,
    FooterBar: null,
});

onMounted(async () => {
    if (!questions.value) {
        surveyStore.getQuestionsData();
    }

    switch (isMobile.value) {
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
