<template>
    <div class="base-carousel">
        <carousel
            :autoplay-interval="5000"
            circular
            :num-scroll="1"
            :num-visible="1"
            :value="items"
        >
            <template #item="slotProps">
                <div class="base-carousel-content">
                    <img alt="logo" :src="getImageUrl(slotProps.data.photo)" />
                    <h2>{{ slotProps.data.header }}</h2>
                    <p>{{ slotProps.data.text }}</p>
                </div>
            </template>
        </carousel>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Carousel from 'primevue/carousel';

const items = ref([
    {
        photo: 'onboard1.png',
        header: 'Узнайте причины жалоб',
        text: 'Результаты опросника помогут определиться с нужным специалистом и записаться на приём',
    },
    {
        photo: 'onboard2.png',
        header: 'Получите список необходимых анализов',
        text: 'Экономьте время и приходите на первый прием уже с результатами анализов',
    },
    {
        photo: 'onboard3.png',
        header: 'Пройдите опросник и получите первичные рекомендации',
        text: 'Вопросы составлены профессиональными врачами, ответы помогут определить твое состояние',
    },
]);

function getImageUrl(name: string): string {
    return new URL(`../assets/onboarding/${name}`, import.meta.url).href;
}
</script>

<style scoped>
.base-carousel {
    background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);
    height: 100vh;
    width: 100%;
}

.base-carousel-content {
    text-align: center;
}

.base-carousel-content img {
    margin-top: 15px;
    max-width: 100%;
}

.base-carousel-content h2 {
    margin: 22px 0;
    font-size: 25px;
}

.base-carousel-content p {
    margin: 25px 0;
    font-size: 19px;
}
</style>
