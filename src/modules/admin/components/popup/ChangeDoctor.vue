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

const { specializations, selectedDoctor } = storeToRefs(clinicStore);

const changeDoctorFirstName = ref<string>(
    selectedDoctor.value?.attributes.firstName ?? ''
);
const changeDoctorLastName = ref<string>(
    selectedDoctor.value?.attributes.lastName ?? ''
);
const changeDoctorMidName = ref<string>(
    selectedDoctor.value?.attributes.midName ?? ''
);
const changeDoctorspecId = ref<string>('');
const changeDoctorExp = ref<string>('');

async function changeDoctor(): Promise<void> {
    if (
        changeDoctorFirstName.value &&
        changeDoctorLastName.value &&
        changeDoctorExp.value &&
        changeDoctorspecId.value
    ) {
        const res = await clinicStore.changeDoctorData(
            selectedDoctor.value?.id ?? '',
            {
                first_name: changeDoctorFirstName.value,
                last_name: changeDoctorLastName.value,
                middle_name: changeDoctorMidName.value,
                experience: changeDoctorExp.value,
                specialization_id: changeDoctorspecId.value,
            }
        );
        if (res === 200) {
            success('Успешно', `Врач изменен`);
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
                    <input-text v-model="changeDoctorFirstName" />
                </div>
                <div>
                    <h3>Имя</h3>
                    <input-text v-model="changeDoctorLastName" />
                </div>
                <div>
                    <h3>Отчество</h3>
                    <input-text v-model="changeDoctorMidName" />
                </div>
                <div>
                    <h3>Опыт (число)</h3>
                    <input-text v-model="changeDoctorExp" type="number" />
                </div>
                <div>
                    <h3>Специализация</h3>
                    <dropdown
                        v-model="changeDoctorspecId"
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
                @click="changeDoctor"
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
