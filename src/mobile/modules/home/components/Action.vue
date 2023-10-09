<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';

import UiButton from '@/ui/UiButton.vue';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);
const router = useRouter();

const actionInfo = computed(() => {
    return isDoctor.value
        ? 'Оставьте заявку в Symptom уже сейчас'
        : 'Определить состояние здоровья уже сейчас';
});

function direct(): void {
    if (isDoctor.value) {
        // TODO registration
    } else {
        router.push({ name: 'choose-survey-flow' });
    }
}
</script>

<template>
    <div class="action">
        <h4 class="action__title">{{ actionInfo }}</h4>
        <div class="action__button">
            <ui-button
                is-big
                is-full
                is-blue
                @click="direct"
            >
                Пройти Опрос
            </ui-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.action {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 60px;
    background: linear-gradient(
        135deg,
        $blue-light 15.72%,
        $blue-lighter 80.75%
    );

    @media (max-width: 500px) {
        padding: $sp3;
    }

    &__title {
        font-size: $fz-great;
        line-height: $lh-bigger;
        text-align: center;
        color: $black-primary;
        margin: $sp6 0;
    }

    &__button {
        width: 100%;
        margin-bottom: $sp4;
    }
}
</style>
