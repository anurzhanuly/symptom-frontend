<script setup lang="ts">
defineProps({
    value: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    name: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
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
    font-size: $fz-normal;
    background-color: $white-darker;
    border: 1px solid $gray-lighter;
    transition: 0.1s;
    padding: $sp3 $sp2;
}

.input:focus {
    box-shadow: inset 0px 0px 2px 1px rgba(33, 150, 243, 1);
    outline: none;
    border-color: rgba(33, 150, 243, 1);
}
</style>
