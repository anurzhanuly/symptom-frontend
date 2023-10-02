<script setup lang="ts">
import UiButton from './UiButton.vue';

defineProps({
    headerLogo: Boolean,
    navLinks: {
        type: Array as () => { name: string; htmlClass: string }[], // НУЖНО ПОДУМАТЬ ЛУЧШЕ
        default() {
            return { name: '', htmlClass: '' };
        },
    },
    button: {
        type: Object,
        default() {
            return { route: '', text: '' };
        },
    },
    toggle: {
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
            v-if="button.text"
            class="header__button"
            icon="pi pi-angle-left"
            @click="$router.push({ name: button.route })"
        >
            {{ button.text }}
        </ui-button>
        <img
            v-if="headerLogo"
            src="@/assets/logo-auth.png"
            alt="Symptom logo"
            class="header__logo"
        />
        <nav
            v-if="navLinks.length"
            class="header__links-wrapper"
        >
            <a
                v-for="(obj, index) in navLinks"
                :key="index"
                class="header__link"
                @click="$emit('linkScroll', index)"
            >
                {{ obj.name }}
            </a>
        </nav>
        <p
            v-if="toggle.text"
            class="header__toggle"
            @click="$emit('toggleButton')"
        >
            {{ toggle.text }}
        </p>
    </header>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__logo {
        width: 200px;
        height: 100%;
    }

    &__links-wrapper {
        display: flex;
        width: 60%;
        justify-content: space-between;
    }

    &__link {
        color: #1f1534;
        cursor: pointer;
        opacity: 0.5;
    }

    &__toggle {
        color: #276ef1;
        border-bottom: 1px solid #276ef1;
        cursor: pointer;
    }
}
</style>
