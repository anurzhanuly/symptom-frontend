<template>
  <div>
    <client-information :buttonLabel="'Результаты в PDF'" :clientFIO="consultationResult" />
  </div>
</template>

<script setup lang="ts">
import ClientInformation from "./ClientInformation.vue";
import { useCabinetsStore } from "../store/cabinets.store";
import { storeToRefs } from "pinia";

const cabinetsStore = useCabinetsStore();
const { consultationResult } = storeToRefs(cabinetsStore);
</script>
