<template>
  <div class="team-container">
    <div>
      <h1>Наша команда</h1>
    </div>
    <div>
      <swiper
        :modules="[Pagination, Autoplay]"
        :pagination="true"
        :slides-per-view="4"
        :space-between="30"
        :slides-per-group="4"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide v-for="(item, index) in team" :key="index">
          <div class="images">
            <img :src="getImageUrl(item.photo)" alt="logo" />
            <strong>{{ item.name }}</strong>
            <p>{{ item.info }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>

  <div v-if="isDoctor" class="questions">
    <div class="questions-actions">
      <div>
        <h1>Остались вопросы?</h1>
        <p>Оставьте контактные данные, чтобы мы могли перезвонить вам и проконсультровать</p>
      </div>
      <input-text v-model="name" placeholder="Ваше имя и фамилия" />
      <input-text v-model="place" placeholder="Место работы" />
      <input-text v-model="phone" placeholder="Номер телефона" />
      <p-button label="Отправить" />
    </div>
    <div class="questions-img">
      <img src="@/assets/onboard1.png" alt="logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "../store/main.store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import InputText from "primevue/inputtext";
import PButton from "primevue/button";

const mainStore = useMainStore();
const { isDoctor } = storeToRefs(mainStore);

const name = ref("");
const place = ref("");
const phone = ref("");

const team = [
  {
    photo: "Temirlan.png",
    name: "Темирлан Кайназаров",
    info: "Co-founder, CEO MD, Enterpreneur",
  },
  {
    photo: "Azat.png",
    name: "Азат Нуржанулы",
    info: "Co-founder, CTO Choco Group",
  },
  {
    photo: "Karina.png",
    name: "Карина Тапинова",
    info: "MD, Research Assistant",
  },
  {
    photo: "Aiza.png",
    name: "Айза Алманиязова",
    info: "MD, Family Med Doctor",
  },
  {
    photo: "Miras.png",
    name: "Мирас Зейнолдин ",
    info: "MD, Family Med Doctor",
  },
  {
    photo: "Perizat.png",
    name: "Перизат Канабекова",
    info: "MD, Internal Med Doctor",
  },
  {
    photo: "Meruert.png",
    name: "Меруерт Рыскулбек",
    info: "MD",
  },
  {
    photo: "Aruzhan.png",
    name: "Аружан Жаксылык",
    info: "MD",
  },
  {
    photo: "Sanzhar.png",
    name: "Санжар Асылбекулы",
    info: "Back-end, Kolesa group",
  },
  {
    photo: "Almas.png",
    name: "Алмас Казыбек",
    info: "Front-end, Kaspi",
  },
  {
    photo: "Ali.png",
    name: "Али Шалбаев",
    info: "Back-end & ML (ИИ), АП",
  },
  {
    photo: "Shynara.png",
    name: "Шынара Аянбек",
    info: "Front-end, Vostok",
  },
];

function getImageUrl(name: string) {
  return new URL(`../../../assets/team/${name}`, import.meta.url).href;
}
</script>

<style scoped>
.team-container {
  padding: 20px 150px;
  height: 35vh;
}

.team-container div:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.images {
  display: flex;
  flex-direction: column;
}

.images img {
  margin-bottom: 7px;
}

.images p {
  margin: 5px 0;
}

.questions {
  display: flex;
  margin: 10px 150px 50px 150px;
  padding: 45px 85px;
  background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);
  border-radius: 10px;
}

.questions h1 {
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #ffffff;
  margin-bottom: 15px;
}

.questions p {
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 10px;
}

.questions-actions {
  display: flex;
  flex-direction: column;
}

.questions-img {
  width: 50%;
}
.questions-img img {
  width: 100%;
}

.questions .p-inputtext {
  font-family: "Montserrat";
  font-style: normal;
  margin: 15px 0;
  padding: 15px;
  border-radius: 10px;
  width: 450px;
}

.questions .p-button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  height: 45px;
  width: 340px;
  background: #276ef1;
  border-radius: 10px;
  margin-top: 15px;
}
</style>
