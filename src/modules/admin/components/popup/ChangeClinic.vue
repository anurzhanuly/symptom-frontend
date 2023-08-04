<script lang="ts" setup>
import { useClinicsStore } from '../../stores/clinics.store';
import { validateClinic } from '@/utils/validation';
import { success } from '@/utils/toast';
import { inject, ref } from 'vue';

import PButton from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { storeToRefs } from 'pinia';

const clinicStore = useClinicsStore();
const dialogRef = inject<any>('dialogRef');

const { cities, selectedClinic } = storeToRefs(clinicStore);

const changeClinicName = ref<string>(selectedClinic.value?.attributes.name as string);
const changeClinicCityId = ref<string>('');
const changeClinicAddress = ref<string>(selectedClinic.value?.attributes.address as string);

async function changeClinic(): Promise<void> {
    if (
        validateClinic(
            changeClinicName.value,
            changeClinicCityId.value,
            changeClinicAddress.value
        )
    ) {
        const res = await clinicStore.changeClinicData(
            selectedClinic.value?.id as string,
            {
                name: changeClinicName.value,
                address: changeClinicAddress.value,
                city_id: changeClinicCityId.value,
            }
        );

        if (res === 200) {
            success('Успешно', 'Клиника изменена');
            dialogRef.value.close();
        }
    }
}
</script>

<template>
    <div>
        <div class="clinic-list-popup p-fluid">
            <form class="clinic-list-popup-form">
                <div>
                    <h3>Название клиники</h3>
                    <input-text v-model="changeClinicName" />
                </div>
                <div>
                    <h3>Город</h3>
                    <dropdown
                        v-model="changeClinicCityId"
                        option-label="attributes.city"
                        option-value="id"
                        :options="cities"
                        placeholder="Выберите город"
                    />
                </div>
                <div>
                    <h3>Адрес</h3>
                    <input-text v-model="changeClinicAddress" />
                </div>
            </form>
        </div>

        <div class="clinic-list-popup-action">
            <p-button
                class="p-button-success"
                label="Изменить"
                @click="changeClinic"
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
