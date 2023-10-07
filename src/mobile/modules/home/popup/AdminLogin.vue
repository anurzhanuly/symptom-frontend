<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateLogin } from '@/utils/validation';

import PButton from 'primevue/button';
import InputText from 'primevue/inputtext';
import { postLogin } from '@mobile/modules/authorization/services/authorization.refbooks';
import PPassword from 'primevue/password';

const router = useRouter();

const login = ref('');
const password = ref('');
const dialogRef = inject<any>('dialogRef');

async function checkAdmin() {
    if (validateLogin(login.value, password.value)) {
        const res = await postLogin(login.value.trim(), password.value.trim());

        if (res) {
            localStorage.setItem(
                'admToken',
                JSON.stringify(res.data.data.token)
            );

            router.push('/admin');
        }
    }

    dialogRef.value.close();
}
</script>

<template>
    <div class="popup">
        <div>
            <h3>Логин</h3>
            <input-text
                v-model="login"
                style="width: 100%"
            />
        </div>
        <div>
            <h3>Пароль</h3>
            <p-password
                v-model="password"
                toggle-mask
            />
        </div>
        <p-button
            autofocus
            class="p-button-success"
            icon="pi pi-check"
            label="Ввести"
            style="margin-top: 20px; width: 100%"
            @click="checkAdmin"
        />
    </div>
</template>

<style scoped>
.popup {
    display: flex;
    flex-direction: column;
}

.popup h3 {
    margin: 10px 0px;
}
</style>
