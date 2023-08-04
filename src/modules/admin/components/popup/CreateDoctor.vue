<script lang="ts" setup>
import { inject, ref } from 'vue';
import { success, error } from '@/utils/toast';
import { useClinicsStore } from '../../stores/clinics.store';

import PButton from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { storeToRefs } from 'pinia';

const clinicStore = useClinicsStore();
const dialogRef = inject<any>('dialogRef');

const newDoctorFirstName = ref<string>('');
const newDoctorspecId = ref<string>('');
const newDoctorExp = ref<string>('');
const newDoctorLastName = ref<string>('');
const newDoctorMidName = ref<string>('');

const { specializations } = storeToRefs(clinicStore);

async function createDoctor(): Promise<void> {
    if (
        newDoctorFirstName.value &&
        newDoctorLastName.value &&
        newDoctorExp.value &&
        newDoctorspecId.value
    ) {
        const res = await clinicStore.createDoctorData({
            first_name: newDoctorFirstName.value,
            last_name: newDoctorLastName.value,
            middle_name: newDoctorMidName.value,
            experience: newDoctorExp.value,
            specialization_id: newDoctorspecId.value,
        });
        if (res === 200) {
            success('Успешно', `Врач добавлен`);
            dialogRef.value.close();
        }
    } else {
        error('Ошибка', `Не хватает данных`);
    }
}
</script>

<template>
    <div>
        <div class="clinic-list-popup p-fluid">
            <form class="clinic-list-popup-form">
                <div>
                    <h3>Фамилия</h3>
                    <input-text v-model="newDoctorFirstName" />
                </div>
                <div>
                    <h3>Имя</h3>
                    <input-text v-model="newDoctorLastName" />
                </div>
                <div>
                    <h3>Отчество</h3>
                    <input-text v-model="newDoctorMidName" />
                </div>
                <div>
                    <h3>Опыт (число)</h3>
                    <input-text v-model="newDoctorExp" type="number" />
                </div>
                <div>
                    <h3>Специализация</h3>
                    <dropdown
                        v-model="newDoctorspecId"
                        option-label="attributes.name"
                        option-value="id"
                        :options="specializations"
                        placeholder="Выберите специализацию"
                    />
                </div>
            </form>
        </div>

        <div class="clinic-list-popup-action">
            <p-button
                class="p-button-success"
                label="Сохранить"
                @click="createDoctor"
            />
        </div>
    </div>
</template>

<style scoped>
.clinic-list-popup {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
}

.clinic-list-popup-form {
    width: 60%;
}

.clinic-list-popup-form > div {
    margin: 15px 0;
}

.clinic-list-popup-action {
    display: flex;
    justify-content: center;
}

.clinic-list-popup-action .p-button {
    width: 315px;
}
</style>
