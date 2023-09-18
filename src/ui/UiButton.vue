<script setup lang="ts">
defineProps({
    isBlue: Boolean,
    isFull: Boolean,
    isLoading: Boolean,
    icon: {
        type: String,
        default: '',
    },
    isBig: Boolean,
    isBorder: Boolean,
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
            'button--border': isBorder,
        }"
        :disabled="isLoading"
    >
        <span
            v-if="isLoading"
            class="button-loader"
        />
        <span
            v-else
            class="button-content"
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
    padding: 14px 20px;
    white-space: pre-wrap;
    cursor: pointer;
    font-family: 'OpenSans', sans-serif;
    letter-spacing: 1px;

    &-loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid #fff;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    &-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &--border {
        border: 1px solid #2196f3;
    }

    &--blue {
        background-color: #2196f3;
        color: #fff;
    }

    &--full {
        width: 100%;
    }

    &--loading {
        position: relative;
        pointer-events: none;
        background-color: #5eadef;
        padding: 22px;
    }

    &--big {
        font-size: 20px;
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
