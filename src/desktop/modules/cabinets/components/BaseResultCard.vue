<script setup lang="ts">
import type { PropType } from 'vue';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import type { Recommendation } from '@/common/types/cabinets/cabinets';
import UiButton from '@/ui/UiButton.vue';

defineProps({
    routeName: {
        type: String,
        required: true,
    },
    patientResult: {
        type: Object,
        default: () => ({
            attributes: {
                firstName: '',
                lastName: '',
                phone: '',
            },
        }),
    },
    patientCard: {
        type: Object,
        required: true,
    },
    recommendations: {
        type: Array as PropType<Recommendation[]>,
        required: true,
    },
});
</script>

<template>
    <div class="result">
        <div class="result-card">
            <ui-button
                is-white
                icon="pi pi-angle-left header__button"
                class="result__button"
                @click="$router.push({ name: routeName })"
            >
                Назад
            </ui-button>
            <card>
                <template #content>
                    <div class="result-card-content">
                        <div>
                            <h3>
                                Пациент:
                                {{ patientResult?.attributes.firstName }}
                                {{ patientResult?.attributes.lastName }}
                            </h3>
                            <p>
                                Номер телефона:
                                {{ patientResult?.attributes.phone }}
                            </p>
                        </div>
                    </div>
                </template>
            </card>
        </div>

        <div class="result-patient-answer">
            <card>
                <template #title> Карточка пациента </template>
                <template #content>
                    <panel
                        v-for="(info, title) in patientCard"
                        :key="title"
                        :header="title.toString()"
                        toggleable
                    >
                        <p
                            v-for="(value, key) in info"
                            :key="key"
                            class="result__text"
                        >
                            {{ key }} {{ value }}
                        </p>
                    </panel>
                </template>
            </card>
        </div>

        <div class="result-recommendations">
            <card>
                <template #title> Рекомендации </template>
                <template #content>
                    <div>
                        <panel
                            v-for="(item, id) in recommendations"
                            :key="id"
                            class="recommendation__panel"
                            :header="item.title"
                            toggleable
                        >
                            <p v-html="item.recommendation" />
                        </panel>
                    </div>
                </template>
            </card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.result {
    padding: $sp4;
}

.result__button {
    margin-bottom: $sp4;
}

.result-card p {
    margin-top: 15px;
}

.result__text {
    margin: 0;
}

.result-card-content {
    display: flex;
    align-items: center;
    padding-left: $sp4;
}

.result-recommendations,
.result-patient-answer {
    margin-top: 7px;
}

.result-recommendations li,
.result-patient-answer li {
    margin-top: 3px;
}

.p-panel {
    margin-bottom: 10px;
}
</style>
