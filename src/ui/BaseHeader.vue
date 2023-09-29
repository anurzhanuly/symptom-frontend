<script setup lang="ts">
import UiButton from './UiButton.vue';

defineProps({
    headerLogo: Boolean,
    buttonBack: Boolean,
    headerLinks: Boolean,
    navLinks: {
        type: Object,
        default() {
            return { name: '', htmlClass: '' };
        },
    },
    buttonProps: {
        type: Object,
        default() {
            return { route: '', text: 'Назад' };
        },
    },
    toggleProps: {
        type: Object,
        default() {
            return { text: '' };
        },
    },
});
</script>

<template>
    <header class="header">
        <ui-button
            v-if="buttonBack"
            class="header__button button-back"
            icon="pi pi-angle-left"
            @click="$router.push({ name: buttonProps.route })"
        >
            {{ buttonProps.text }}
        </ui-button>
        <img
            v-if="headerLogo"
            src="@/assets/logo-auth.png"
            alt="Symptom logo"
            class="header__logo"
        />
        <nav
            v-if="headerLinks"
            class="header__links-wrapper"
        >
            <a
                v-for="(link, index) in navLinks"
                :key="index"
                class="header__link"
                @click="$emit('linkScroll', index)"
            >
                {{ link.name }}
            </a>
            <p
                class="header__button-toggle"
                @click="$emit('toggleButton')"
            >
                {{ toggleProps.text }}
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
    }

    &__links-wrapper {
        width: 80%;
        display: flex;
        justify-content: space-around;
    }

    &__link {
        color: #1f1534;
        cursor: pointer;
        font-size: 16px;
        opacity: 0.5;
    }

    &__button-toggle {
        font-size: 16px;
        color: #276ef1;
        border-bottom: 1px solid #276ef1;
        cursor: pointer;
    }
}
</style>
