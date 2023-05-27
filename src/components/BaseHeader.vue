<template>
    <div class="base-header">
        <div class="base-header-content">
            <img
                alt="Symptom logo"
                src="@/assets/logo-auth.png"
                @click="$router.push('/')"
            >
            <p-button
                class="p-button-raised p-button-outlined p-button-text"
                icon="pi pi-sign-out"
                @click="$router.push('/')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import PButton from "primevue/button";
</script>

<style scoped>
.base-header {
    border-bottom: 1px solid #cacaca;
}

.base-header-content {
    display: flex;
    justify-content: space-between;
    margin: 15px 15px;
}
</style>
