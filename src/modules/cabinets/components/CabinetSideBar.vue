<template>
  <div class="pages-nav">
    <label
      v-for="(view, index) in props.views"
      :key="index"
      :for="`${index}`"
      class="label"
      :class="{ selected: selectedPage === view.label }"
      @click="$router.push(view.to)"
    >
      <i :class="view.icon" />
      <input :id="`${index}`" v-model="selectedPage" type="radio" class="hidden" :value="view.label" />
      {{ view.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedPage = ref<any>("Главная");
const props = defineProps({
  views: Object,
});
</script>

<style scoped>
.pages-nav {
  height: max-content;
  width: 280px;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  background-color: #ffffff;
}

.hidden {
  visibility: hidden;
  position: absolute;
  right: 0;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.label {
  display: block;
  margin-top: 1px;
  padding: 14px;
  font-weight: 400;
  cursor: pointer;
}

.selected {
  background: #eef5fb;
  border-right: 3px solid #276ef1;
}
</style>
