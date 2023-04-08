<template>
  <swiper
    :modules="[Pagination, Autoplay]"
    :pagination="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide v-for="(item, index) in items" :key="index">
      <div class="swiper-img">
        <img :src="getImageUrl(item.photo)" alt="logo" />
        <h2>{{ item.heading }}</h2>
        <p>{{ item.innerText }}</p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper";

const items = [
  {
    photo: "onboard1.png",
    heading: "Узнайте причины жалоб",
    innerText: "Результаты опросника помогут определиться с нужным специалистом и записаться на приём",
  },
  {
    photo: "onboard2.png",
    heading: "Получите список необходимых анализов",
    innerText: "Экономьте время и приходите на первый прием уже с результатами анализов",
  },
  {
    photo: "onboard3.png",
    heading: "Пройдите опросник и получите первичные рекомендации",
    innerText: "Вопросы составлены профессиональными врачами, ответы помогут определить твое состояние",
  },
];

function getImageUrl(name: string) {
  return new URL(`../assets/${name}`, import.meta.url).href;
}
</script>

<style scoped>
.swiper {
  min-height: 97vh;
}

.swiper-img {
  margin-top: 85px;
  text-align: center;
}

.swiper-img h2,
.swiper-img p {
  margin-top: 18px;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
