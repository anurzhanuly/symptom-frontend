<script lang="ts" setup>
import { useHomeStore } from '../store/home.store';
import { storeToRefs } from 'pinia';
import { scrollToElement } from '@/utils/scroll';

const homeStore = useHomeStore();

const { links } = storeToRefs(homeStore);
</script>

<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <h2 class="footer__title">Symptom</h2>
            <div class="footer__links-container">
                <a
                    v-for="(link, index) in links"
                    :key="index"
                    class="footer__link"
                    @click="scrollToElement(link.htmlClass)"
                >
                    {{ link.name }}
                </a>
            </div>
            <div class="footer__icons-container">
                <a
                    href="https://www.instagram.com/symptom.kz/?igshid=YmMyMTA2M2Y%3D"
                    target="_blank"
                >
                    <i class="pi pi-instagram footer__icon" />
                </a>
                <a href="tel:+77773771515">
                    <i class="pi pi-phone footer__icon" />
                </a>
                <a
                    href="https://api.whatsapp.com/send/?phone=77773771515"
                    target="_blank"
                >
                    <i class="pi pi-whatsapp footer__icon" />
                </a>
            </div>
            <p class="footer__text">Все права защищены «Symptom» 2023</p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    background: linear-gradient(
        135deg,
        $blue-light 15.72%,
        $blue-lighter 80.75%
    );
    padding: $sp6 0;

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        font-size: $fz-huge;
        color: $black;
        cursor: default;
    }

    &__links-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: $sp6;

        @media (max-width: 500px) {
            display: none;
        }
    }

    &__link {
        font-size: $fz-normal;
        color: $black;
        padding: 0 $sp4;
        cursor: pointer;
    }

    &__icons-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: $sp6 0;
    }

    &__icon {
        font-size: $fz-great;
        margin: 0 $sp3;
        color: $white;
        background-color: $blue-darker;
        border-radius: $radius;
        padding: $sp2;
        cursor: pointer;
    }

    &__text {
        font-size: $fz-small;
        line-height: $lh-base;
        color: $black;
        margin: 0;
    }
}
</style>
