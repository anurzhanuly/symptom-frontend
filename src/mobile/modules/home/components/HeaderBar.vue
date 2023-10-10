<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';

const homeStore = useHomeStore();

const { isDoctor } = storeToRefs(homeStore);

const label = computed(() => {
    return isDoctor.value ? 'Для пациента' : 'Для врача';
});
</script>

<template>
    <header>
        <div class="header-container">
            <img
                alt="logo"
                class="header-container__img"
                src="@/assets/logo.png"
            />
            <p
                class="header-container__button"
                @click="isDoctor = !isDoctor"
            >
                {{ label }}
            </p>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $sp5 60px;

    @media (max-width: 500px) {
        padding: $sp3;
    }

    &__img {
        width: 150px;
    }

    &__button {
        font-size: $fz-normal;
        color: $blue-primary;
        border-bottom: 1px solid $blue-primary;
        cursor: pointer;
    }
}
</style>
