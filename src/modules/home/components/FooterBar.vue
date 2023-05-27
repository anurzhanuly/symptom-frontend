<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-symptom">
                <h2 @click="openAdminLoginPopup">
Symptom
</h2>
            </div>
            <div class="footer-info">
                <a
                    v-for="(link,index) in links"
                    :key="index"
                    class="static-buttons"
                    @click="scrollToElement(link.htmlClass)"
                >
                    {{ link.name }}
                </a>
            </div>
            <div class="footer-icons">
                <a
                    href="https://www.instagram.com/symptom.kz/?igshid=YmMyMTA2M2Y%3D"
                    target="_blank"
                >
                    <i class="pi pi-instagram" />
                </a>
                <a href="tel:+77779613377">
                    <i class="pi pi-phone" />
                </a>
                <a
                    href="https://api.whatsapp.com/send/?phone=77779613377"
                    target="_blank"
                >
                    <i class="pi pi-whatsapp" />
                </a>
            </div>
            <div class="footer-reserved">
                <h2>Все права защищены «Symptom» 2023</h2>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import AdminLogin from "../popup/AdminLogin.vue";
import { useDialog } from "primevue/usedialog";
import { useHomeStore } from "../store/home.store";
import { storeToRefs } from "pinia";
import { scrollToElement } from "@/utils/scroll";

const dialog = useDialog();
const homeStore = useHomeStore();

const { links } = storeToRefs(homeStore);

function openAdminLoginPopup(): void {
    dialog.open(AdminLogin, {
        props: {
            header: "Введите логин и пароль",
            style: {
                width: "25%"
            },
            modal: true
        }
    });
}
</script>

<style scoped>
.footer {
    background: linear-gradient(135deg, #62a9e3 15.72%, #aacceb 80.75%);
    padding: 25px 0;
}

.footer-symptom,
.footer-icons,
.footer-reserved {
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-symptom h2 {
    font-size: 33px;
    color: #000000;
    letter-spacing: 2.5px;
}

.footer-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
}

.footer-info a {
    font-weight: 500;
    font-size: 18px;
    color: #000000;
    padding: 0 15px;
    cursor: pointer;
}

.footer-icons {
    margin-top: 15px;
}

.footer-icons i {
    font-size: 1.5rem;
    margin: 0 10px;
    color: #ffffff;
    background-color: #276ef1;
    border-radius: 5px;
    padding: 8px;
    cursor: pointer;
}

.footer-reserved h2 {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    margin-top: 15px;
}

@media (max-width: 550px) {
    .footer-info {
        display: none;
    }
}

@media (max-width: 400px) {
    .footer-reserved h2 {
        font-size: 14px;
    }
}
</style>
