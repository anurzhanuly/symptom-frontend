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
            htmlClass: '.solutions',
            name: 'Решение',
        },
        {
            htmlClass: '.advantages',
            name: 'Преимущества',
        },
    ]);

    return {
        isDoctor,
        links,
    };
});
