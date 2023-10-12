<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';

import UiButton from '@/ui/UiButton.vue';
import { scrollToElement } from '@/utils/scroll';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);
const router = useRouter();

const actionInfo = computed(() => {
    return isDoctor.value
        ? 'Оставьте заявку в Symptom уже сейчас'
        : 'Определите состояние здоровья уже сейчас';
});

const buttonInfo = computed(() => {
    return isDoctor.value ? 'Оставить заявку' : 'Пройти опрос';
});

function direct(): void {
    if (isDoctor.value) {
        scrollToElement('.questions');
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
                {{ buttonInfo }}
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
    background: $white;

    @media (max-width: 500px) {
        padding: $sp6;
    }

    &__title {
        font-size: $fz-great;
        font-weight: 600;
        line-height: $lh-bigger;
        text-align: center;
        color: $black-primary;
        margin-bottom: $sp6;
    }

    &__button {
        width: 100%;
        margin-bottom: $sp4;
    }
}
</style>
