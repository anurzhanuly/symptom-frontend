<template>
    <div>
        <div class="clinic-list-popup p-fluid">
            <form class="clinic-list-popup-form">
                <div>
                    <h3>Название клиники</h3>
                    <input-text v-model="newClinicName" />
                </div>
                <div>
                    <h3>Город</h3>
                    <dropdown
                        v-model="newClinicCityId"
                        :options="cities"
                        option-label="attributes.city"
                        option-value="id"
                        placeholder="Выберите город"
                    />
                </div>
                <div>
                    <h3>Адрес</h3>
                    <input-text v-model="newClinicAddress" />
                </div>
            </form>
        </div>

        <div class="clinic-list-popup-action">
            <p-button
                label="Сохранить"
                class="p-button-success"
                @click="createClinic"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useClinicsStore } from "../../stores/clinics.store";
import { validateClinic } from "@/utils/validation";
import { success } from "@/utils/toast";
import { inject, ref } from "vue";

import PButton from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { storeToRefs } from "pinia";

const clinicStore = useClinicsStore();
const dialogRef = inject<any>("dialogRef");

const newClinicName = ref<string>("");
const newClinicCityId = ref<string>("");
const newClinicAddress = ref<string>("");

const { cities } = storeToRefs(clinicStore);

async function createClinic(): Promise<void> {
    if (validateClinic(newClinicName.value, newClinicCityId.value, newClinicAddress.value)) {
        const res = await clinicStore.createClinicData({
            name: newClinicName.value,
            address: newClinicAddress.value,
            city_id: newClinicCityId.value
        });

        if (res === 200) {
            success("Успешно", `Клиника добавлена`);
            dialogRef.value.close();
        }
    }
}
</script>

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
