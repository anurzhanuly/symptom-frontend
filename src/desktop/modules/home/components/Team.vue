<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';

import Carousel from 'primevue/carousel';
import InputText from 'primevue/inputtext';
import PButton from 'primevue/button';
import UiButton from '@/ui/UiButton.vue';
import { success, warn } from '@/utils/toast';
import { postNpsRequest } from '@desktop/modules/home/services/home.refbooks';

const homeStore = useHomeStore();
const { isDoctor } = storeToRefs(homeStore);

const name = ref('');
const workplace = ref('');
const phone = ref('');

const responsiveOptions = ref([
    {
        breakpoint: '1250px',
        numVisible: 3,
        numScroll: 3,
    },
    {
        breakpoint: '1163px',
        numVisible: 2,
        numScroll: 2,
    },
    {
        breakpoint: '750px',
        numVisible: 1,
        numScroll: 1,
    },
]);

const team = ref([
    {
        photo: 'Temirlan.png',
        name: 'Темирлан Кайназаров',
        info: 'Co-founder, CEO MD, Enterpreneur',
    },
    {
        photo: 'Azat.png',
        name: 'Азат Нуржанулы',
        info: 'Co-founder, CTO Choco Group',
    },
    {
        photo: 'Karina.png',
        name: 'Карина Тапинова',
        info: 'MD, Research Assistant',
    },
    {
        photo: 'Aiza.png',
        name: 'Айза Алманиязова',
        info: 'MD, Family Med Doctor',
    },
    {
        photo: 'Miras.png',
        name: 'Мирас Зейнолдин ',
        info: 'MD, Family Med Doctor',
    },
    {
        photo: 'Perizat.png',
        name: 'Перизат Канабекова',
        info: 'MD, Internal Med Doctor',
    },
    {
        photo: 'Meruert.png',
        name: 'Меруерт Рыскулбек',
        info: 'MD',
    },
    {
        photo: 'Aruzhan.png',
        name: 'Аружан Жаксылык',
        info: 'MD',
    },
    {
        photo: 'Sanzhar.png',
        name: 'Санжар Асылбекулы',
        info: 'Back-end, Kolesa group',
    },
    {
        photo: 'Almas.png',
        name: 'Алмас Казыбек',
        info: 'Front-end, Kaspi',
    },
    {
        photo: 'Ali.png',
        name: 'Али Шалбаев',
        info: 'Back-end & ML (ИИ), АП',
    },
    {
        photo: 'Shynara.png',
        name: 'Шынара Аянбек',
        info: 'Front-end, Vostok',
    },
]);

function getImageUrl(name: string): string {
    return new URL(`../../../../assets/team/${name}`, import.meta.url).href;
}

async function sendRequest() {
    if (!name.value) {
        warn('Ошибка', 'Введите имя');
        return;
    }

    if (!phone.value) {
        warn('Ошибка', 'Введите телефон');
        return;
    }

    const res = await postNpsRequest({
        name: name.value,
        workplace: workplace.value,
        phone: phone.value,
    });

    if (res) {
        success('Успешно', 'Запрос отправлен');
    }
}
</script>

<template>
    <div class="team">
        <div class="team__carousel">
            <carousel
                :autoplay-interval="3000"
                :num-scroll="4"
                :num-visible="4"
                :responsive-options="responsiveOptions"
                :value="team"
            >
                <template #header>
                    <h1 class="team__title">Наша команда</h1>
                </template>
                <template #item="slotProps">
                    <div class="team__content">
                        <img
                            alt="logo"
                            :src="getImageUrl(slotProps.data.photo)"
                        />
                        <h3>{{ slotProps.data.name }}</h3>
                        <p>{{ slotProps.data.info }}</p>
                    </div>
                </template>
            </carousel>
        </div>
    </div>

    <div
        v-if="isDoctor"
        class="questions"
    >
        <div class="questions__form">
            <h1 class="questions__title">Остались вопросы?</h1>
            <p class="questions__text">
                Оставьте контактные данные, чтобы мы могли перезвонить вам и
                проконсультровать
            </p>
            <input-text
                v-model="name"
                class="questions__field"
                placeholder="Ваше имя и фамилия"
            />
            <input-text
                v-model="workplace"
                class="questions__field"
                placeholder="Место работы"
            />
            <input-text
                v-model="phone"
                class="questions__field"
                placeholder="Номер телефона"
            />
            <p-button
                label="Отправить"
                class="questions__button"
                @click="sendRequest"
            />
        </div>
        <div class="questions__img-wrapper">
            <img
                alt="logo"
                src="@/assets/onboarding/onboard1.png"
                class="questions__img"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.team {
    padding: 20px 150px;
    font-style: normal;

    @media screen and (max-width: 860px) {
        padding: 20px 65px;
    }

    &__carousel {
        margin-top: 25px;
    }

    &__title {
        text-align: center;
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        margin: 25px 0;
    }
}

.questions {
    display: flex;
    margin: 10px 150px 50px 150px;
    padding: 45px 85px;
    background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);
    border-radius: 10px;

    @media screen and (max-width: 860px) {
        padding: 45px;
        margin: 10px 50px 50px 50px;
    }

    &__form {
        display: flex;
        flex-direction: column;
    }

    &__title {
        font-size: 36px;
        line-height: 44px;
        color: #ffffff;
        margin-bottom: 15px;
    }

    &__text {
        font-size: 18px;
        color: #ffffff;
        margin-bottom: 10px;
    }

    &__field {
        margin: 15px 0;
        padding: 15px;
        border-radius: 10px;
        width: 450px;

        @media (max-width: 920px) {
            width: 100%;
        }
    }

    &__button {
        font-weight: 600;
        font-size: 16px;
        height: 45px;
        width: 340px;
        background: #276ef1;
        border-radius: 10px;
        margin-top: 15px;

        @media (max-width: 920px) {
            width: 100%;
        }
    }

    &__img-wrapper {
        width: 50%;

        @media (max-width: 1200px) {
            display: none;
        }
    }

    &__img {
        width: 100%;
    }
}
</style>
