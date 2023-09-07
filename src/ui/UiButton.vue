<script setup lang="ts">
defineProps({
    isWhite: Boolean,
    isFull: Boolean,
    isLoading: Boolean,
    icon: String,
});
</script>

<template>
    <button
        :class="{
            button: true,
            'button--white': isWhite,
            'button--full': isFull,
            'button--loading': isLoading,
        }"
        :disabled="isLoading"
    >
        <span
            v-if="isLoading"
            class="button-loader"
        />
        <span v-else>
            <i :class="icon" />
            <slot> </slot>
        </span>
    </button>
</template>

<style lang="scss" scoped>
.button {
    background-color: #276ef1;
    color: white;
    display: inline-block;
    border-radius: 10px;
    border: 1px solid #276ef1;
    padding: 14px 20px;
    letter-spacing: 1px;
    white-space: pre-wrap;
    cursor: pointer;

    &--white {
        background-color: white;
        color: #276ef1;
        border: 1px solid #2196f3;
    }

    &--full {
        width: 100%;
    }
    &--loading {
        position: relative;
        pointer-events: none;
        background-color: #5eadef;
        padding: 20px;
        .button-loader {
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
