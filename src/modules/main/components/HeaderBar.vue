<template>
  <header>
    <div class="header-container">
      <RouterLink to="/">
        <img src="@/assets/logo.png" class="header-image" alt="logo" />
      </RouterLink>
      <p v-for="link in links" class="static-buttons" @click="mainStore.scroll(link.top)">{{ link.name }}</p>
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
  font-size: 18px;
  color: #276ef1;
  border-bottom: 1px solid #276ef1;
  cursor: pointer;
}

.static-buttons {
  color: #1f1534;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  opacity: 0.5;
}

.header-image {
  width: 250px;
}

@media (max-width: 1350px) {
  .static-buttons {
    display: none;
  }

  .header-image {
    width: 200px;
  }
}

@media (max-width: 860px) {
  .header-container {
    padding: 20px 60px;
  }
}

@media (max-width: 490px) {
  .header-container {
    padding: 20px 15px;
  }

  .header-image {
    width: 180px;
  }

  .dynamic-button {
    font-size: 16px;
  }
}

@media (max-width: 400px) {
  .header-image {
    width: 150px;
  }
}
</style>
