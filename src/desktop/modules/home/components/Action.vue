<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

import UiButton from '@/ui/UiButton.vue';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);
const router = useRouter();

const actionInfo = computed(() => {
    return isDoctor.value
        ? 'Оставьте заявку в Symptom уже сейчас'
        : 'Определите состояние здоровья уже сейчас';
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
    height: 22vh;
    justify-content: space-evenly;
    background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);

    &__title {
        font-size: 36px;
        color: #212121;
    }

    &__button {
        width: 50%;
    }
}
</style>
