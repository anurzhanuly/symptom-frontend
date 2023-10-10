<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);

const advantagesInfoFirst = computed(() => {
    return isDoctor.value
        ? 'В работу интегрирован искусственный интеллект от OpenAI–ChatGPT, который успешно сдал медицинский экзамен на лицензирование врачей в США'
        : 'Опросник составлен на основе опыта практикующих врачей, которые знают, какие жалобы требуют повышенного внимания';
});

const advantagesInfoSecond = computed(() => {
    return isDoctor.value
        ? 'Для составления рекомендаций используются проверенные источники, которые являются золотым стандартом доказательной медицины - BMJ Best Practice, NCCN, UptoDate и клинические рекомендации США и Европы. Протестировано на клинических кейсах от ресурсов Access Medicine'
        : 'Медицинская команда проекта использует только доказательную медицину';
});
</script>

<template>
    <div class="advantages">
        <div class="advantages__wrapper">
            <h2 class="advantages__title">Приемущества Symptom</h2>
            <div class="advantages__content">
                <p class="advantages__subtitle">01</p>
                <p class="advantages__text">{{ advantagesInfoFirst }}</p>
            </div>
            <div class="advantages__content">
                <p class="advantages__subtitle">02</p>
                <p class="advantages__text">{{ advantagesInfoSecond }}</p>
            </div>
            <div class="advantages__content" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.advantages {
    padding: $sp3 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $payed-blue;

    @media (max-width: 500px) {
        padding: $sp5;
    }

    &__title {
        font-size: $fz-huge;
        font-weight: 600;
        line-height: $lh-huge;
        color: $black;
        padding-top: $sp4;
        text-align: center;
    }

    &__content {
        display: flex;
        align-items: center;
        margin-top: $sp6;

        @media (max-width: 500px) {
            align-items: flex-start;
            flex-direction: column;
        }
    }

    &__subtitle {
        font-size: 32px;
        font-weight: 600;
        color: $blue-light;
        line-height: $sp;
        margin-right: $sp4;
    }

    &__text {
        font-size: $fz-big;
        line-height: $lh-big;
        color: $black;
        margin: 0;
    }
}
</style>
