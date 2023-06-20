<template>
    <div>
        <header class="header">
            <p-button
                icon="pi pi-angle-left header__button"
                label="Назад"
                link
                @click="$router.push('/')"
            />
        </header>
    </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button';
</script>

<style lang="scss">
.header {
}

.p-button {
    padding: 0;
}

.p-button-label {
    text-decoration: underline;
}

.pi {
    font-weight: bold;
}
</style>
