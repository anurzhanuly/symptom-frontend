<script setup lang="ts">
import { computed } from 'vue';
import { useHomeStore } from '../store/home.store';
import { storeToRefs } from 'pinia';
import { scrollToElement } from '@/utils/scroll';
import BaseHeader from '@/ui/BaseHeader.vue';
const homeStore = useHomeStore();

const { isDoctor, links } = storeToRefs(homeStore);

const label = computed(() => {
    return isDoctor.value ? 'Для пациента' : 'Для врача';
});
</script>

<template>
    <base-header
        :header-links="true"
        :button-back="true"
        :header-logo="true"
        :nav-links="links"
        :toggle-props="{ text: label }"
        @toggleButton="isDoctor = !isDoctor"
        @linkScroll="(index) => scrollToElement(links[index].htmlClass)"
    ></base-header>
    <!-- <header>
        <div class="header-container">
            <img
                alt="logo"
                class="header-container__img"
                src="@/assets/logo.png"
            />
            <a
                v-for="(link, index) in links"
                :key="index"
                class="header-container__link"
                @click="scrollToElement(link.htmlClass)"
            >
                {{ link.name }}
            </a>
            <p
                class="header-container__button"
                @click="isDoctor = !isDoctor"
            >
                {{ label }}
            </p>
        </div>
    </header> -->
</template>

<style lang="scss" scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    padding: 20px 190px;

    &__img {
        width: 200px;
    }

    &__link {
        color: #1f1534;
        cursor: pointer;
        font-size: 16px;
        opacity: 0.5;

        @media (max-width: 1350px) {
            display: none;
        }
    }

    &__button {
        font-size: 16px;
        color: #276ef1;
        border-bottom: 1px solid #276ef1;
        cursor: pointer;
    }
}
</style>
