<script setup lang="ts">
defineProps({
    value: String,
    type: {
        type: String,
        default: 'text',
    },
    name: String,
    placeholder: String,
    isRequired: Boolean,
});
</script>

<template>
    <input
        :v-model="value"
        :class="{
            input: true,
        }"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :required="isRequired"
    />
</template>

<style lang="scss" scoped>
.input {
    width: 100%;
    background-color: #f3f3f3;
    border: 1px solid #ced4da;
    transition: 0.1s;
    padding: 12px 5px;
}

.input:focus {
    box-shadow: inset 0px 0px 2px 1px rgba(33, 150, 243, 1);
    outline: none;
    border-color: rgba(33, 150, 243, 1);
}
</style>
