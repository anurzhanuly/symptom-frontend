import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('home', () => {
    const isDoctor = ref(false);
    const links = ref([
        {
            htmlClass: '.about',
            name: 'О проекте',
        },
        {
            htmlClass: '.solution-container',
            name: 'Решение',
        },
        {
            htmlClass: '.advantages-container',
            name: 'Преимущества',
        },
    ]);

    return {
        isDoctor,
        links,
    };
});
