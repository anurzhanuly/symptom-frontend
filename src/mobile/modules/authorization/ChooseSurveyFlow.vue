<script setup lang="ts">
import Header from './components/Header.vue';
import FlowButtons from './components/FlowButtons.vue';

localStorage.removeItem('doctorId'); //TODO Странное место для удаления, потом подумать как лучше
</script>

<template>
    <Header />
    <flow-buttons />
</template>
