<script setup lang="ts">
defineProps({
    isWhite: Boolean,
    isMargin: Boolean,
    isAction: Boolean,
    isBack: Boolean,
    showIcon: Boolean,
});
</script>

<template>
    <button
        :class="{
            button: true,
            'button--white': isWhite,
            'button--margin': isMargin,
            'button-action': isAction,
            'button-back': isBack,
            'pi pi-angle-left header__button': showIcon,
        }"
    >
        <slot> </slot>
    </button>
</template>

<style lang="scss" scoped>
.button {
    background-color: #276ef1;
    color: white;
    place-items: center;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #2196f3;
    padding: 12px 20px;
    letter-spacing: 1px;
    white-space: nowrap;
    outline: none;
    transition: all 0.22s;
    cursor: pointer;

    &-action {
        width: 50%;
        font-size: 20px;
        letter-spacing: 2px;
        padding: 20px;
        white-space: pre-wrap;
    }

    &-back {
        border: none;
        width: 60px;
        padding: 0 0 0 16px;
    }

    &--white {
        background-color: white;
        color: #276ef1;
    }

    &--margin {
        margin: 12px 0;
    }
}
</style>
