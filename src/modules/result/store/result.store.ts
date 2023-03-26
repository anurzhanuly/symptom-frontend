import { defineStore } from "pinia";
import { ref } from "vue";

export const useResultStore = defineStore("result", () => {
  const isButtonsVisible = ref<boolean>(true);
  const isResultVisible = ref<boolean>(true);

  function resultPDF() {
    isButtonsVisible.value = false;
    isResultVisible.value = false;
    setTimeout(() => {
      window.print();
    });
    setTimeout(() => {
      isButtonsVisible.value = true;
      isResultVisible.value = true;
    }, 2000);
  }

  return {
    isButtonsVisible,
    isResultVisible,
    resultPDF,
  };
});
