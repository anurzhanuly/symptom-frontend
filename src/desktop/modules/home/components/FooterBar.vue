<script lang="ts" setup>
import AdminLogin from '../popup/AdminLogin.vue';
import { useDialog } from 'primevue/usedialog';
import { useHomeStore } from '../store/home.store';
import { storeToRefs } from 'pinia';
import { scrollToElement } from '@/utils/scroll';

const dialog = useDialog();
const homeStore = useHomeStore();

const { links } = storeToRefs(homeStore);

function openAdminLoginPopup(): void {
    dialog.open(AdminLogin, {
        props: {
            header: 'Введите логин и пароль',
            style: {
                width: '70%',
            },
            modal: true,
        },
    });
}
</script>

<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <h2
                class="footer__title"
                @click="openAdminLoginPopup"
            >
                Symptom
            </h2>
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

<style lang="scss" scoped>
.footer {
    background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);
    padding: 25px 0;

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        font-size: 36px;
        color: #000000;
        cursor: default;
    }

    &__links-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
    }

    &__link {
        font-size: 20px;
        color: #000000;
        padding: 0 16px;
        cursor: pointer;
    }

    &__icons-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
    }

    &__icon {
        font-size: 24px;
        margin: 0 12px;
        color: #ffffff;
        background-color: #276ef1;
        border-radius: 5px;
        padding: 8px;
        cursor: pointer;
    }

    &__text {
        font-size: 20px;
        line-height: 24px;
        color: #000000;
        margin-top: 16px;
    }
}
</style>
