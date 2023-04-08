<template>
  <div class="authorization-section">
    <div class="onboarding-main">
      <base-swiper />
    </div>
    <div class="authorization-main">
      <div class="link-back" @click="$router.push('/')">
        <span>&lt; Назад</span>
      </div>
      <div class="authorization-wrapper p-fluid">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSwiper from "@/components/BaseSwiper.vue";
</script>

<style scoped>
.authorization-section {
  display: flex;
  min-height: 100vh;
}

.onboarding-main {
  width: 40%;
  background-color: rgba(170, 204, 235, 0.4);
}

.link-back {
  cursor: pointer;
  position: absolute;
  top: 33px;
  margin-left: 33px;
}

.link-back span {
  color: #276ef1;
  font-weight: 600;
}

.link-back a {
  margin-left: 3px;
  color: #276ef1;
  text-decoration: underline;
}

.authorization-main {
  width: 60%;
  margin: auto;
}

.authorization-wrapper {
  display: flex;
  justify-content: center;
}

.authorization-wrapper h4 {
  color: #3f3f3f;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 5px;
}

.authorization-wrapper h4 > span {
  color: #d0312d;
}

@media only screen and (max-width: 375px) {
  .authorization-section {
    min-height: 120vh;
  }

  .onboarding-main {
    display: none;
  }

  .link-back {
    top: 20px;
    left: 20px;
    margin: 0;
  }

  .authorization-main {
    width: 95%;
  }
}

@media (min-width: 376px) and (max-width: 600px) {
  .authorization-section {
    min-height: 100vh;
  }
  .onboarding-main {
    display: none;
  }

  .link-back {
    top: 20px;
    left: 20px;
    margin: 0;
  }
  .authorization-main {
    width: 95%;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .authorization-main {
    margin: 50px 0;
  }
}
</style>
