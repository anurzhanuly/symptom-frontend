<template>
  <router-view />
  <dynamic-dialog />
  <confirm-popup />
  <p-toast />
</template>

<script setup lang="ts">
import DynamicDialog from "primevue/dynamicdialog";
import ConfirmPopup from "primevue/confirmpopup";
import PToast from "primevue/toast";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

body {
  --primary: #2196f3;
  --background: #ffffff;
  --background-dim: #f3f3f3;
  --background-dim-light: #f9f9f9;
  --primary-foreground: #ffffff;
  --foreground: #161616;
  --base-unit: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Montserrat";
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

li {
  list-style: none;
}
</style>
