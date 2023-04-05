<template>
  <div class="advantages-container">
    <div class="advantages-info">
      <h3>Наши приемущества</h3>
      <div>
        <h1>01</h1>
        <p>{{ advantagesInfoFirst }}</p>
      </div>
      <div>
        <h1>02</h1>
        <p>{{ advantagesInfoSecond }}</p>
      </div>
      <div></div>
    </div>

    <div class="image">
      <img src="@/assets/phone.png" alt="logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../store/main.store";
import { computed } from "vue";

const mainStore = useMainStore();
const { isDoctor } = storeToRefs(mainStore);

const advantagesInfoFirst = computed(() => {
  return isDoctor.value
    ? "В работу интегрирован искусственный интеллект от OpenAI–ChatGPT, который успешно сдал медицинский экзамен на лицензирование врачей в США"
    : "Опросник составлен на основе опыта практикующих врачей, которые знают, какие жалобы требуют повышенного внимания";
});

const advantagesInfoSecond = computed(() => {
  return isDoctor.value
    ? "Для составления рекомендаций используются проверенные источники, которые являются золотым стандартом доказательной медицины - BMJ Best Practice, NCCN, UptoDate и клинические рекомендации США и Европы. Протестировано на клинических кейсах от ресурсов Access Medicine"
    : "Медицинская команда проекта использует только доказательную медицину";
});
</script>

<style scoped>
.advantages-container {
  padding: 10px 190px;
  display: flex;
  background: #eef5fb;
  justify-content: space-between;
}

.advantages-info {
  display: flex;
  flex-direction: column;
  margin-top: 120px;
}

.advantages-info div {
  display: flex;
  align-items: center;
  margin-top: 90px;
  width: 650px;
}

h1 {
  font-weight: 600;
  font-size: 60px;
  line-height: 60px;
  color: #276ef1;
  margin-right: 15px;
}

h3 {
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #111111;
  margin-left: 75px;
}

p {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
}
</style>
