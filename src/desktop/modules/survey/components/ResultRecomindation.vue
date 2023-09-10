<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useSurveyStore } from '@desktop/modules/survey/store/survey.store';

import Panel from 'primevue/panel';
import PButton from 'primevue/button';

const router = useRouter();
const surveyStore = useSurveyStore();
const { recommendations, recommendationsChatGPT } = storeToRefs(surveyStore);

const patientIdFromLocalStorage = computed(() =>
    localStorage.getItem('patientId')
);
const test = [
    {
        title: 'Щит и Меч Здоровья',
        recommendation:
            'Скрининг - это как медицинская версия путешествия во времени. Это проверка вашего здоровья, когда все еще хорошо, чтобы предотвратить болезни, которые могут возникнуть в будущем. Это шанс оставаться на шаг впереди угроз для вашего здоровья и вовремя отреагировать!',
    },
    {
        title: 'Гипертензия и Глаукома',
        recommendation:
            '1) Общий холестерин и ЛПВП в крови 1 раз в год\n<br>2) ЭКГ 1 раз в год\n<br>3) Измерение внутриглазного давления 1 раз в год\n<br>4) Консультация офтальмолога (по показаниям)',
    },
    {
        title: 'Диабет, ЖКТ, Почки',
        recommendation:
            '1)      Глюкоза в крови 1 раз в год\n<br>2)\tГликозилированный гемоглобин в крови 1 раз в год\n<br>3)\tУЗИ щитовидной железы 1 раз в год\n<br>4)\tС результатами проконсультироваться с эндокринологом\n<br>5)\tОбщего билирубина, АЛТ, АСТ 1 раз в год\n<br>7)\tФГДС \n<br>8)\tУЗИ гепатобилиарной области\n<br>9)\tОбнаружение скрытой крови в кале\n<br>10)\tОбщий анализ мочи и Креатинин\n<br>11)\tУЗИ почек, мочевого пузыря с определением остаточной мочи',
    },
    {
        title: 'Здоровый образ жизни',
        recommendation:
            '1) В мире снов важен баланс: от 7 до 9 часов - ваша магическая формула здоровья.\n<br>2) Сделайте ваш рацион калейдоскопом вкуса: яркие овощи, сочные фрукты, питательные орехи и здоровые цельнозерновые. Прощайте соленые и копченые продукты, а конфеты и газировки замените на чистую воду - 2–3  литра ежедневно в вашем кувшине здоровья.\n<br>3) Благословите себя ежедневными мини-отпусками под открытым небом: 20 минут свежего воздуха для зарядки души и тела. Найдите время для медитации и удовольствий, отдайте себя в объятия семьи, друзей и хобби.\n<br>4) Ваша жизнь — это непрерывное приключение! Окунитесь в мир спорта: прогулки, плавание, танцы, велосипед - выбирайте любое и ощутите, как тревога и депрессия исчезают. Откройте для себя новых людей, новые места и новые ощущения. Заветные 150 минут умеренной или 75 минут интенсивной активности в неделю — это ваш билет в страну здоровья и долголетия. И помните, наша жизнь — это движение: перерывы для разминки, прогулки вместо поездок и меньше времени у экранов - ваш путь к полноценной жизни.',
    },
];

function saveRecommendation() {
    router.push({ name: 'client-sign-in' });
    sessionStorage.setItem('saveRec', '1'); //TODO тупое быстрое решение
}
</script>

<template>
    <div class="recommendation">
        <h2 class="recommendation__title">Рекомендации</h2>
        <panel
            v-for="(item, index) in recommendations"
            :key="index"
            class="recommendation__panel"
            :header="item.title"
            toggleable
        >
            <p v-html="item.recommendation" />
        </panel>
        <h2 class="recommendation__title">Рекомендации от SymptomAi</h2>
        <panel
            v-for="(item, index) in recommendationsChatGPT"
            :key="index"
            class="recommendation__panel"
            :header="item.title"
            toggleable
        >
            <p v-html="item.recommendation" />
        </panel>
        <p-button
            v-if="!patientIdFromLocalStorage"
            label="Сохранить"
            @click="saveRecommendation"
        />
    </div>
</template>

<style scoped lang="scss">
.recommendation {
    padding: 16px;

    &__title {
        margin-bottom: 24px;
    }

    &__panel {
        margin-bottom: 16px;
    }
}

.p-button {
    width: 100%;
}
</style>
