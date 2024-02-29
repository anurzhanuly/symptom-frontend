<script setup lang="ts">
import FlowButtons from './components/FlowButtons.vue';

localStorage.removeItem('surveyFlow');
localStorage.removeItem('doctorId');
</script>

<template>
    <FlowButtons />
</template>
