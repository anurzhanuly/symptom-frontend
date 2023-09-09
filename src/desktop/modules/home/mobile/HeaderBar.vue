<script setup lang="ts">
import { computed } from 'vue';
import { useHomeStore } from '../store/home.store';
import { storeToRefs } from 'pinia';
import { scrollToElement } from '@desktop/utils/scroll';
const homeStore = useHomeStore();

const { isDoctor, links } = storeToRefs(homeStore);

const label = computed(() => {
    return isDoctor.value ? 'Для пациента' : 'Для врача';
});
</script>

<template>
    <header>
        <div class="header-container">
            <router-link to="/">
                <img
                    alt="logo"
                    class="header-image"
                    src="@desktop/assets/logo.png"
                />
            </router-link>
            <a
                v-for="(link, index) in links"
                :key="index"
                class="static-buttons"
                @click="scrollToElement(link.htmlClass)"
            >
                {{ link.name }}
            </a>
            <p
                class="dynamic-button"
                @click="isDoctor = !isDoctor"
            >
                {{ label }}
            </p>
        </div>
    </header>
</template>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    padding: 20px 190px;
}

.dynamic-button {
    font-size: 16px;
    color: #276ef1;
    border-bottom: 1px solid #276ef1;
    cursor: pointer;
}

.static-buttons {
    color: #1f1534;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    opacity: 0.5;
}

.header-image {
    width: 250px;
}

@media (max-width: 1350px) {
    .static-buttons {
        display: none;
    }

    .header-image {
        width: 200px;
    }
}

@media (max-width: 860px) {
    .header-container {
        padding: 20px 60px;
    }
}

@media (max-width: 490px) {
    .header-container {
        padding: 20px 15px;
    }

    .header-image {
        width: 180px;
    }

    .dynamic-button {
        font-size: 16px;
    }
}

@media (max-width: 400px) {
    .header-image {
        width: 150px;
    }
}
</style>
