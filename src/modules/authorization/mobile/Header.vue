<script setup lang="ts">
import PButton from 'primevue/button';
</script>

<template>
    <div>
        <header class="header">
            <p-button
                icon="pi pi-angle-left"
                label="Назад"
                link
                @click="$router.back()"
            />
            <img
                alt="Symptom logo"
                class="header__logo"
                src="@/assets/logo-auth.png"
            />
        </header>
    </div>
</template>

<style lang="scss" scoped>
.header {
    padding: 20px 16px;
    display: flex;
    justify-content: space-between;

    &__logo {
        max-width: 100px;
    }
}

.p-button {
    padding: 0;
}

.pi {
    font-weight: bold;
}
</style>
