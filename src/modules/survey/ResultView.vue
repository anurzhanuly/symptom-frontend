<template>
  <section class="section-result">
    <result-patient-card />
    <!-- <result-recomindation /> -->
    <result-recomindation-ai />
    <p-button label="На главную" class="p-button-outlined" style="margin-top: 16px" @click="$router.push('/')" />
  </section>
</template>

<script lang="ts" setup>
import ResultPatientCard from "./components/ResultPatientCard.vue";
// import ResultRecomindation from "./components/ResultRecomindation.vue";
import ResultRecomindationAi from "./components/ResultRecomindationAi.vue";
import PButton from "primevue/button";
</script>

<style scoped>
.section-result {
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  margin: 0 auto 40px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
</style>
