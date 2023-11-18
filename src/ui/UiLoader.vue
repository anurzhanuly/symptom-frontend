<script setup lang="ts">
defineProps({
    isLoaderBig: Boolean,
    isLoaderBlue: Boolean,
});
</script>

<template>
    <span
        :class="{
            loader: true,
            'loader--big': isLoaderBig,
            'loader--blue': isLoaderBlue,
        }"
    ></span>
</template>

<style scoped lang="scss">
.loader {
    display: block;
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
        border: 3px solid;
        border-top: 2px solid transparent;
    }

    &--blue {
        border-color: $blue-primary;
        border-top: 2px solid transparent;
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
