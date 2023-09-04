<script setup lang="ts">
</script>

<template>
    <button class="button">
      <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.button {
    background: #276ef1;
    color: white;
    position: relative;
    place-content: center;
    place-items: center;
    width: 290px;
    border-radius: 10px;
    letter-spacing: 0.05em;
    border: 1px solid #2196F3;
    text-decoration: none;
    margin-right: 10px;
    padding: 0.5rem 1.5rem;
    white-space: nowrap;
    outline: none;
    transition: all 0.22s;
    cursor: pointer;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>