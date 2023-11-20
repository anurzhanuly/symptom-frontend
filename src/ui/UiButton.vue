<script setup lang="ts">
import UiLoader from './UiLoader.vue';

defineProps({
    isBlue: Boolean,
    isWhite: Boolean,
    isFull: Boolean,
    isLoading: Boolean,
    icon: {
        type: String,
        default: '',
    },
    isBig: Boolean,
});
</script>

<template>
    <button
        :class="{
            button: true,
            'button--blue': isBlue,
            'button--full': isFull,
            'button--loading': isLoading,
            'button--big': isBig,
            'button--white': isWhite,
        }"
        :disabled="isLoading"
        type="button"
    >
        <ui-loader v-if="isLoading"></ui-loader>
        <span
            v-else
            class="button__content"
        >
            <i :class="icon" />
            <slot />
        </span>
    </button>
</template>

<style lang="scss" scoped>
.button {
    background-color: transparent;
    color: $blue-primary;
    border-radius: $sp;
    border: none;
    white-space: pre-wrap;
    cursor: pointer;
    font-family: 'OpenSans', sans-serif;
    letter-spacing: 1px;
    font-size: $fz-normal;

    &__content {
        display: flex;
        justify-content: center;
    }

    &--white {
        border: 1px solid $blue-primary;
        background-color: $white;
        color: $blue-primary;
        padding: $sp3 $sp5;
    }

    &--blue {
        background-color: $blue-primary;
        color: $white;
        padding: $sp3 $sp5;
    }

    &--full {
        width: 100%;
    }

    &--loading {
        pointer-events: none;
        display: flex;
        justify-content: center;
        padding: $sp6 0 $sp 0;
        background-color: $blue-light;
    }

    &--big {
        font-size: $fz-bigger;
    }
}
</style>
