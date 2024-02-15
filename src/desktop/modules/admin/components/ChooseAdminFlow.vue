<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useAdminStore } from '@desktop/modules/admin/stores/admin.store';

import UiButton from '@/ui/UiButton.vue';
import { warn } from '@/utils/toast';
import Dropdown from 'primevue/dropdown';

const adminStore = useAdminStore();
const router = useRouter();

onMounted(() => {
    localStorage.removeItem('diseaseId');
    if (!adminStore.allDiseases.length) {
        adminStore.getDiseasesData();
    }
});

const { allDiseases } = storeToRefs(adminStore);
const diseaseId = ref('');

function goToAdmin() {
    if (!diseaseId.value) {
        warn('Внимание', 'Выберите пожалуйста болезнь из списка');
        return false;
    }

    localStorage.setItem('diseaseId', diseaseId.value);
    router.push({ name: 'admin-quest' });
}
</script>

<template>
    <div class="admin-flow">
        <h2 class="admin-flow__title">Выберите админку</h2>
        <ui-button
            is-big
            is-blue
            class="admin-flow__item"
            @click="$router.push({ name: 'admin-quest' })"
        >
            Перейти в общую админку
        </ui-button>
        <br />
        <span class="admin-flow__text"> Или выберите болезнь из списка </span>
        <dropdown
            v-model="diseaseId"
            :empty-message="'Ничего не найдено'"
            filter
            filter-placeholder="Поиск"
            lazy
            option-label="attributes.name"
            option-value="id"
            :options="allDiseases"
            class="admin-flow__dropdown"
        />
        <ui-button
            is-big
            is-blue
            class="admin-flow__item"
            @click="goToAdmin"
        >
            Перейти в админку болезни
        </ui-button>
    </div>
</template>

<style lang="scss" scoped>
.admin-flow {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    padding: $sp6 $sp4;

    &__title {
        text-align: center;
        margin-bottom: $sp6;
        font-size: $fz-great;
    }

    &__item {
        margin-bottom: $sp6;
    }

    &__text {
        margin: $sp2 auto;
        font-size: $fz-bigger;
    }

    &__dropdown {
        margin-bottom: $sp4;
    }
}
</style>
