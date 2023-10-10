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

<style scoped lang="scss">
.solutions {
    display: flex;
    flex-direction: column;
    padding: $sp6 60px;
    align-items: center;
    background: linear-gradient(
        110deg,
        $blue-light 15.72%,
        $blue-lighter 80.75%
    );

    @media (max-width: 500px) {
        padding: $sp6 $sp3;
    }

    &__title {
        font-size: $fz-great;
        font-weight: 600;
        line-height: $lh-bigger;
        text-align: center;
        color: $white;
    }

    &__content {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: $sp5;
        margin-top: $sp5;
    }

    &__descr {
        background: $payed-blue;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: $sp5;
        padding: $sp4;

        @media (max-width: 500px) {
            flex-direction: column;
        }
    }

    &__text {
        font-size: $fz-normal;
        line-height: $lh-base;
        color: $black;
    }
}
</style>
