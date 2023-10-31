<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';
import { computed } from 'vue';

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
            <h2 class="advantages__title">Преимущества Symptom</h2>
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
        <img
            class="advantages__img"
            alt="logo"
            src="@/assets/phone.png"
        />
    </div>
</template>

<style lang="scss" scoped>
.advantages {
    padding: $sp2 190px;
    display: flex;
    background: $payed-blue;
    justify-content: space-between;
    align-items: center;

    &__title {
        font-size: $fz-max;
        line-height: $lh-huge;
        color: $black;
        padding-top: $sp4;
        text-align: center;
    }

    &__content {
        display: flex;
        align-items: center;
        margin-top: 40px;
        max-width: 650px;

        @media (max-width: 1350px) {
            margin-top: 0;
        }

        @media (max-width: 1250px) {
            max-width: 100%;
        }
    }

    &__subtitle {
        font-size: 40px;
        line-height: $lh-huge;
        color: $blue-darker;
        margin-right: $sp4;
    }

    &__text {
        font-size: $fz-bigger;
        line-height: $lh-big;
        color: $black;
    }

    &__img {
        width: 40%;
        height: 100%;

        @media (max-width: 1250px) {
            display: none;
        }
    }
}
</style>
