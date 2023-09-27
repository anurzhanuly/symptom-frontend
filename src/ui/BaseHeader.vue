<script setup lang="ts">
import { computed } from 'vue';
import { useHomeStore } from '@/desktop/modules/home/store/home.store';
import { storeToRefs } from 'pinia';
import { scrollToElement } from '@/utils/scroll';
import UiButton from './UiButton.vue';
const homeStore = useHomeStore();

const { isDoctor, links } = storeToRefs(homeStore);

const label = computed(() => {
    return isDoctor.value ? 'Для пациента' : 'Для врача';
});

defineProps({
    headerLogo: Boolean,
    headerLinks: Boolean,
    buttonBack: Boolean,
});
</script>

<template>
    <header class="header">
        <ui-button
            v-if="$props.buttonBack"
            class="header__button button-back"
            icon="pi pi-angle-left"
            @click="$router.push({ name: 'home' })"
        >
            Назад
        </ui-button>
        <img
            v-if="$props.headerLogo"
            src="@/assets/logo-auth.png"
            alt="Symptom logo"
            class="header__logo"
        />
        <nav
            v-if="$props.headerLinks"
            class="header__links-wrapper"
        >
            <a
                v-for="(link, index) in links"
                :key="index"
                class="header__link"
                @click="scrollToElement(link.htmlClass)"
            >
                {{ link.name }}
            </a>
            <p
                class="header__button-toggle"
                @click="isDoctor = !isDoctor"
            >
                {{ label }}
            </p>
        </nav>
    </header>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__logo {
        width: 200px;
        height: 100%;

        @media (max-width: 900px) {
            width: 150px;
        }
    }

    &__links-wrapper {
        width: 80%;
        display: flex;
        justify-content: space-around;

        @media (max-width: 1350px) {
            justify-content: end;
        }
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

    &__button-toggle {
        font-size: 16px;
        color: #276ef1;
        border-bottom: 1px solid #276ef1;
        cursor: pointer;
    }
}
</style>
