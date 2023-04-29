<template>
  <header-bar />
  <main-bar />
  <about-project />
  <solutions />
  <advantages />
  <team />
  <footer-bar />

  <scroll-top />
</template>

<script setup lang="ts">
import HeaderBar from "./components/HeaderBar.vue";
import MainBar from "./components/MainBar.vue";
import AboutProject from "./components/AboutProject.vue";
import Solutions from "./components/Solutions.vue";
import Advantages from "./components/Advantages.vue";
import Team from "./components/Team.vue";
import FooterBar from "./components/FooterBar.vue";

import ScrollTop from "primevue/scrolltop";
</script>
