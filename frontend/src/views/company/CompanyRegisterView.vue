<template>
    <v-container class="pa-4" max-width="xs" @submit.prevent="handleSubmit">
        <v-card>
            <v-card-title>
                <h1>Register Company</h1>
            </v-card-title>
            <v-card-subtitle>
                <v-form>
                    <v-text-field
                        v-model="localCompany.name"
                        label="Name"
                        placeholder="ABC Corp"
                        type="text"
                    />
                    <v-btn
                    @click="handleSubmit()"
                    color="primary"
                    class="mt-4"
                    block
                    >
                    Register
                    </v-btn>
                </v-form>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { CompanyRegisterRequest } from '../../types/company';
import CompanyService from '../../service/CompanyService';
import Cookies from 'js-cookie';

export default defineComponent({
    name: 'CompanyRegisterForm',

    setup() {
        const router = useRouter();

        const localCompany = ref<CompanyRegisterRequest>({
            name: ''
        });

        const handleSubmit = async () => {
            if (localCompany) {
                // TODO: Add validation
                const response = await CompanyService.companyRegister(localCompany.value);
                if (response.company) {
                    Cookies.set('companyId', response.company.id);
                    router.push('/cu-register');
                } else {
                    console.log('something happened: ' + JSON.stringify(response));
                }
            } else {
                console.log('Could not retrieve company.');
            }
        }

        return {
            localCompany,
            handleSubmit
        }
    }
});

</script>

<style scoped>

</style>