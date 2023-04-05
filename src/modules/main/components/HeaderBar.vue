<template>
  <header>
    <div class="header-container">
      <RouterLink to="/">
        <img src="@/assets/logo.png" class="header-image" alt="logo" />
      </RouterLink>
      <div class="static-buttons">
        <p v-for="link in links" @click="mainStore.scroll(link.top)">{{ link.name }}</p>
      </div>
      <div>
        <p class="dynamic-button" @click="isDoctor = !isDoctor">{{ label }}</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "../store/main.store";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();

const { isDoctor, links } = storeToRefs(mainStore);

const label = computed(() => {
  return isDoctor.value ? "Для пациента" : "Для врача";
});
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  padding: 20px 190px;
}

.dynamic-button {
  float: right;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  color: #276ef1;
  border-bottom: 1px solid #276ef1;
  cursor: pointer;
}

.static-buttons {
  display: flex;
}

.static-buttons p {
  color: #1f1534;
  cursor: pointer;
  margin: 0 55px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  opacity: 0.5;
}

.header-image {
  width: 250px;
}

@media (max-width: 480px) {
  .header-image {
    width: 150px;
  }

  .dynamic-button {
    font-size: 15px;
  }
}

@media (max-width: 350px) {
  .header-image {
    width: 120px;
  }
}
</style>
