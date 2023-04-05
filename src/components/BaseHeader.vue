<template>
  <div class="base-header">
    <div class="base-header-content">
      <img src="@/assets/logo-auth.png" alt="Symptom logo" />
      <p-button
        icon="pi pi-sign-out"
        class="p-button-raised p-button-outlined p-button-text"
        @click="$router.push('/')"
      ></p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PButton from "primevue/button";
</script>

<style scoped>
.base-header {
  border-bottom: 1px solid #cacaca;
}

.base-header-content {
  display: flex;
  justify-content: space-between;
  margin: 15px 15px;
}
</style>
