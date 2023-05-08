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
