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
            <h1 class="advantages__title">Наши приемущества</h1>
            <div class="advantages__content">
                <h3 class="advantages__subtitle">01</h3>
                <p class="advantages__text">{{ advantagesInfoFirst }}</p>
            </div>
            <div class="advantages__content">
                <h3 class="advantages__subtitle">02</h3>
                <p class="advantages__text">{{ advantagesInfoSecond }}</p>
            </div>
            <div class="advantages__content" />
        </div>

        <div class="advantages__img-wrapper">
            <img
                class="advantages__img"
                alt="logo"
                src="@/assets/phone.png"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.advantages {
    padding: 10px 190px;
    display: flex;
    background: #eef5fb;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 860px) {
        padding: 10px 100px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
    }

    &__title {
        font-weight: 600;
        font-size: 36px;
        line-height: 44px;
        color: #111111;
        margin-left: 75px;
        padding-top: 15px;

        @media (max-width: 1250px) {
            text-align: center;
            margin-left: 0;
        }

        @media (max-width: 860px) {
            font-size: 30px;
        }
    }

    &__content {
        display: flex;
        align-items: center;
        margin-top: 90px;
        width: 650px;

        @media (max-width: 1350px) {
            margin-top: 30px;
        }

        @media (max-width: 1250px) {
            width: 100%;
        }
    }

    &__subtitle {
        font-weight: 600;
        font-size: 60px;
        line-height: 60px;
        color: #276ef1;
        margin-right: 15px;
    }

    &__text {
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        color: #000000;
    }

    &__img {
        width: 100%;
    }

    &__img-wrapper {
        @media (max-width: 1250px) {
            display: none;
        }
    }
}
</style>
