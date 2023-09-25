<script setup lang="ts">
const solutions = [
    {
        img: 'microscope.png',
        info: 'Пройдя опрос, вы узнаете возможные причины своего состояния и получите рекомендации, какие обследование необходимо пройти',
    },
    {
        img: 'stethoscope.png',
        info: 'Symptom помогает определить, к какому специалисту лучше обратиться',
    },
    {
        img: 'clipboard.png',
        info: 'Качественная доврачебная диагностика помогает сфокусировать внимание врача на вашем состоянии, а не на заполнении врачебных форм',
    },
    {
        img: 'drugs.png',
        info: 'Чем больше врач будет знать о пациенте, тем больше оснований принять более правильное решение',
    },
    {
        img: 'first-aid-kit.png',
        info: 'Врач заранее получит результаты доврачебного опроса и поэтому на приеме сможет уделить вам больше времени',
    },
    {
        img: 'magnifying.png',
        info: 'Symptom поможет собрать историю болезни, не упустив важные детали',
    },
];

function getImageUrl(name: string) {
    return new URL(`../../../../assets/solutions/${name}`, import.meta.url)
        .href;
}
</script>

<template>
    <div class="solutions">
        <h2 class="solutions__title">Какие проблемы решает Symptom</h2>
        <div class="solutions__content">
            <div
                v-for="(solution, index) in solutions"
                :key="index"
                class="solutions__descr"
            >
                <img
                    alt="logo"
                    :src="getImageUrl(solution.img)"
                />
                <p class="solutions__text">{{ solution.info }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.solutions {
    display: flex;
    flex-direction: column;
    padding: 40px 100px;
    align-items: center;

    &__content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-top: 20px;

        @media (max-width: 1400px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    &__descr {
        background: #eef5fb;
        border-radius: 20px;
        padding: 15px;

        @media (max-width: 1240px) {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
    }

    &__text {
        font-size: 18px;
        line-height: 28px;
        color: #000000;
    }
}
</style>
