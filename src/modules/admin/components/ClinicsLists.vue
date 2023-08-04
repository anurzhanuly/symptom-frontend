<script lang="ts" setup>
import CreateClinic from './popup/CreateClinic.vue';
import ChangeClinic from './popup/ChangeClinic.vue';
import CreateDoctor from './popup/CreateDoctor.vue';
import ChangeDoctor from './popup/ChangeDoctor.vue';
import type { Clinics, Doctors } from '../types/clinics';
import { useClinicsStore } from '../stores/clinics.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import PButton from 'primevue/button';
// import { useConfirm } from "primevue/useconfirm";
import { useDialog } from 'primevue/usedialog';

const clinicsStore = useClinicsStore();
const dialog = useDialog();
// const confirm = useConfirm();

const { clinics, doctors, selectedClinic, selectedDoctor } =
    storeToRefs(clinicsStore);

onMounted(() => {
    clinicsStore.getCitiesData();
    clinicsStore.getSpecializationsData();
});

function createClinic(): void {
    dialog.open(CreateClinic, {
        props: {
            header: 'Добавление новой клиники',
            style: {
                width: '30%',
            },
            modal: true,
        },
    });
}

function createDoctor(): void {
    dialog.open(CreateDoctor, {
        props: {
            header: 'Добавление нового врача',
            style: {
                width: '30%',
            },
            modal: true,
        },
    });
}

function changeClinic(data: Clinics): void {
    selectedClinic.value = data;
    dialog.open(ChangeClinic, {
        props: {
            header: 'Изменение клинки',
            style: {
                width: '30%',
            },
            modal: true,
        },
    });
}

function changeDoctor(data: Doctors): void {
    selectedDoctor.value = data;
    dialog.open(ChangeDoctor, {
        props: {
            header: 'Изменение врача',
            style: {
                width: '30%',
            },
            modal: true,
        },
    });
}
</script>

<template>
    <div class="clinic-list">
        <data-table
            class="p-datatable-sm"
            edit-mode="cell"
            reorderable-columns
            resizable-columns
            selection-mode="single"
            show-gridlines
            striped-rows
            :value="clinics"
        >
            <template #header>
                <div class="clinics-list-table-header">
                    <div>
                        <h2>Все клиники</h2>
                    </div>
                    <div>
                        <p-button
                            class="p-button-success"
                            label="Добавить клинику"
                            @click="createClinic"
                        />
                    </div>
                </div>
            </template>
            <column field="id" header="Id" header-style="width: 2%" />
            <column field="attributes.name" header="Название" />
            <column field="attributes.city" header="Город" />
            <column field="attributes.address" header="Адрес" />
            <column header-style="width: 6%">
                <template #body="slotProps">
                    <p-button
                        label="Изменить"
                        @click="changeClinic(slotProps.data)"
                    />
                </template>
            </column>
            <column header-style="width: 6%">
                <template #body>
                    <p-button
                        class="p-button-danger"
                        :disabled="true"
                        label="Удалить"
                    />
                </template>
            </column>
        </data-table>

        <data-table
            class="p-datatable-sm"
            edit-mode="cell"
            reorderable-columns
            resizable-columns
            selection-mode="single"
            show-gridlines
            striped-rows
            :value="doctors"
        >
            <template #header>
                <div class="clinics-list-table-header">
                    <div>
                        <h2>Все врачи</h2>
                    </div>
                    <div>
                        <p-button
                            class="p-button-success"
                            label="Добавить врача"
                            @click="createDoctor"
                        />
                    </div>
                </div>
            </template>
            <column field="id" header="Id" header-style="width: 2%" />
            <column header="ФИО">
                <template #body="slotProps">
                    {{ slotProps.data.attributes.firstName }}
                    {{ slotProps.data.attributes.lastName }}
                    {{ slotProps.data.attributes.midName }}
                </template>
            </column>
            <column field="attributes.specialization" header="Специализация" />
            <column field="attributes.experience" header="Опыт" />
            <column header-style="width: 6%">
                <template #body="slotProps">
                    <p-button
                        label="Изменить"
                        @click="changeDoctor(slotProps.data)"
                    />
                </template>
            </column>
            <column header-style="width: 6%">
                <template #body>
                    <p-button
                        class="p-button-danger"
                        :disabled="true"
                        label="Удалить"
                    />
                </template>
            </column>
        </data-table>
    </div>
</template>

<style scoped>
.clinics-list-table-header {
    display: flex;
    justify-content: space-between;
}

.clinics-list-table-header .p-button {
    margin-left: 5px;
}
</style>
