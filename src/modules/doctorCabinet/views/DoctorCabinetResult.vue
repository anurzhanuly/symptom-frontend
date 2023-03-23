<template>
  <div>
    <base-client-info :buttonLabel="'Результаты в PDF'" :clientFIO="consultationResult" />
  </div>
</template>

<script setup lang="ts">
import BaseClientInfo from "@/components/BaseClientInfo.vue";
import { useCabinetStore } from "../store/cabinet.store";
import { storeToRefs } from "pinia";

const cabinetStore = useCabinetStore();
const { consultationResult } = storeToRefs(cabinetStore);
</script>
