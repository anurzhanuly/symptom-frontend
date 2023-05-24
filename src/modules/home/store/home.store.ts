import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore("home", () => {
    const isDoctor = ref(false);
    const links = ref([
        {
            top: 900,
            name: "О проекте"
        },
        {
            top: 1800,
            name: "Решение"
        },
        {
            top: 2400,
            name: "Преимущества"
        },
        {
            top: 3250,
            name: "Команда"
        }
    ]);

    function scroll(top: number): void {
        window.scrollTo({
            top: top,
            behavior: "smooth"
        });
    }

    return {
        isDoctor,
        links,
        scroll
    };
});
