<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useWebviewStore } from '@mobile/modules/webview/store/webview.store';
import { getParameterByKey } from '@/utils/url';
import UiButton from '@/ui/UiButton.vue';

const webviewStore = useWebviewStore();
const { patientId } = storeToRefs(webviewStore);

onMounted(() => {
    patientId.value = getParameterByKey('userId') || '';
    console.log(patientId.value);
});
</script>
<template>
    <div class="buttons">
        <h2 class="buttons__title">Пройти опрос</h2>
        <ui-button
            is-big
            is-full
            is-blue
            class="buttons__item"
            @click="$router.push({ name: '/agreement-wv' })"
        >
            Без регистрации
        </ui-button>
        <ui-button
            is-big
            is-full
            is-white
            class="buttons__item"
            @click="$router.push({ name: '/client-test-auth-wv' })"
        >
            Для врача
        </ui-button>
    </div>
</template>

<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: column;
    padding: 32px 16px;

    &__title {
        font-size: $fz-bigger;
        text-align: center;
        margin-bottom: 24px;
    }

    &__item:not(:last-child) {
        margin-bottom: 16px;
    }
}
</style>
