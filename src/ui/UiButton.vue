<script setup lang="ts">
defineProps({
    isBlue: Boolean,
    isWhite: Boolean,
    isFull: Boolean,
    isLoading: Boolean,
    isLoadingBlue: Boolean,
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
            'button--loading-blue': isLoadingBlue,
            'button--big': isBig,
            'button--white': isWhite,
        }"
        :disabled="isLoading"
        type="button"
    >
        <span
            v-if="isLoading"
            class="button__loader"
        />
        <span
            v-else-if="isLoadingBlue"
            class="button__loader button__loader--big"
        />
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
    position: relative;
    background-color: transparent;
    color: #2196f3;
    display: inline-block;
    border-radius: 3px;
    border: none;
    white-space: pre-wrap;
    cursor: pointer;
    font-family: 'OpenSans', sans-serif;
    letter-spacing: 1px;
    font-size: $fz-normal;

    &__loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: $sp5;
        height: $sp5;
        border: 2px solid $white;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;

        &--big {
            width: 32px;
            height: 32px;
            border: 3px solid $blue-primary;
            border-top: 2px solid transparent;
        }
    }

    &__content {
        display: flex;
        justify-content: center;
    }

    &--white {
        border: 1px solid #2196f3;
        background-color: #fff;
        color: #2196f3;
        padding: $sp3 $sp5;
    }

    &--blue {
        background-color: #2196f3;
        color: $white;
        padding: $sp3 $sp5;
    }

    &--full {
        width: 100%;
    }

    &--loading {
        position: relative;
        pointer-events: none;
        padding: $sp5;
        background-color: $blue-light;
    }

    &--loading-blue {
        position: relative;
        pointer-events: none;
        padding: $sp5;
    }

    &--big {
        font-size: $fz-bigger;
    }
}

@keyframes spin {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>
