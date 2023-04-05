<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-symptom">
        <h2 @click="openAdminLoginPopup">Symptom</h2>
      </div>
      <div class="footer-info">
        <p v-for="link in links" @click="mainStore.scroll(link.top)">{{ link.name }}</p>
      </div>
      <div class="footer-icons">
        <i class="pi pi-instagram" />
        <i class="pi pi-phone" />
        <i class="pi pi-mobile" />
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
import { useMainStore } from "../store/main.store";
import { storeToRefs } from "pinia";

const dialog = useDialog();
const mainStore = useMainStore();

const { links } = storeToRefs(mainStore);

function openAdminLoginPopup(): void {
  dialog.open(AdminLogin, {
    props: {
      header: "Введите логин и пароль",
      style: {
        width: "25%",
      },
      modal: true,
    },
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
  justify-content: space-between;
  padding: 0 650px;
  margin: 25px 0;
}

.footer-info p {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
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

@media (max-width: 770px) {
  .footer {
    margin: 0 60px;
  }
}

@media (max-width: 480px) {
  .footer {
    margin: 0 15px;
  }
}
</style>
