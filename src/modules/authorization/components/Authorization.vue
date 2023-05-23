<template>
  <div class="authorization">
    <div class="authorization-onboarding">
      <base-carousel />
    </div>
    <div class="authorization-main">
      <p-button
        label="Назад"
        link
        icon="pi pi-arrow-left"
        @click="$router.push('/')"
      />
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCarousel from "@/components/BaseCarousel.vue";
import PButton from "primevue/button";
</script>

<style scoped>
.authorization {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.authorization-onboarding,
.authorization-main {
  width: 50%;
}

.authorization-main .p-button {
  font-weight: 650;
}

@media only screen and (max-width: 750px) {
  .authorization-onboarding {
    display: none;
  }

  .authorization-main {
    width: 100%;
  }
}
</style>
