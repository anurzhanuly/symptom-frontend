<template>
    <div class="solution-container">
        <div>
            <h1>Какие проблемы решает Symptom</h1>
        </div>
        <div class="solution">
            <div
                v-for="solution in solutions"
                class="solutions"
            >
                <img
                    alt="logo"
                    :src="getImageUrl(solution.img)"
                >
                <p>{{ solution.info }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const solutions = [
    {
        img: "microscope.png",
        info: "Пройдя опрос, вы узнаете возможные причины своего состояния и получите рекомендации, какие обследование необходимо пройти"
    },
    {
        img: "stethoscope.png",
        info: "Symptom помогает определить, к какому специалисту лучше обратиться"
    },
    {
        img: "clipboard.png",
        info: "Качественная доврачебная диагностика помогает сфокусировать внимание врача на вашем состоянии, а не на заполнении врачебных форм"
    },
    {
        img: "drugs.png",
        info: "Чем больше врач будет знать о пациенте, тем больше оснований принять более правильное решение"
    },
    {
        img: "first-aid-kit.png",
        info: "Врач заранее получит результаты доврачебного опроса и поэтому на приеме сможет уделить вам больше времени"
    },
    {
        img: "magnifying.png",
        info: "Symptom поможет собрать историю болезни, не упустив важные детали"
    }
];

function getImageUrl(name: string) {
    return new URL(`../../../assets/solutions/${name}`, import.meta.url).href;
}
</script>

<style scoped>
.solution-container {
    display: flex;
    flex-direction: column;
    padding: 40px 100px;
    align-items: center;
}

p {
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    color: #000000;
}

.solution {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: center;
}

.solutions {
    background: #eef5fb;
    border-radius: 20px;
    width: 490px;
    margin: 15px;
    padding: 15px;
}

@media (max-width: 1240px) {
    .solutions {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
    }
}

@media (max-width: 860px) {
    .solution-container {
        padding: 40px;
    }
}

@media (max-width: 595px) {
    h1 {
        font-size: 25px;
    }

    p {
        font-size: 16px;
    }

    .solution-container {
        padding: 40px 30px;
    }
}

@media (max-width: 490px) {
    h1 {
        font-size: 18px;
    }

    .solution-container {
        padding: 40px 7px;
    }
}

@media (max-width: 330px) {
    h1 {
        font-size: 16px;
    }

    p {
        font-size: 14px;
    }
}
</style>
