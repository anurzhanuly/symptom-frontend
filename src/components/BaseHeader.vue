<script setup lang="ts">
import PButton from 'primevue/button';
</script>

<template>
    <div class="base-header">
        <img
            alt="Symptom logo"
            src="@/assets/logo-auth.png"
            @click="$router.push('/')"
        >
        <p-button
            class="p-button-raised p-button-outlined p-button-text"
            label="На главную"
            @click="$router.push('/')"
        />
    </div>
</template>

<style scoped>
.base-header {
    border-bottom: 1px solid #cacaca;
    padding: 16px;
    display: flex;
}

.p-button-text {
    margin-left: auto;
}
</style>
