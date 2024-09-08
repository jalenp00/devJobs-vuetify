<template>
    <v-container class="pa-4" max-width="xs" @submit.prevent="handleSubmit">
        <v-card>
            <v-card-title>
                <h1>Register User</h1>
            </v-card-title>
            <v-card-subtitle>
                <v-form>
                    <v-text-field
                        v-model="localUser.name"
                        label="Name"
                        placeholder="John Doe"
                        type="text"
                    />
                    <v-text-field
                        v-model="localUser.email"
                        label="Email"
                        placeholder="JohnDoe@something.com"
                        type="text"
                    />
                    <v-text-field
                        v-model="localUser.password"
                        label="Password"
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
import { CompanyUserRegiserRequest } from '../../types/companyUser';
import CompanyUserService from '../../service/CompanyUserService';
import  { RootState } from '../../store/userStore';
import { useStore } from 'vuex';
import Cookies from 'js-cookie';

export default defineComponent({
    name: 'UserRegisterForm',

    setup() {
        const router = useRouter();
        const store = useStore<RootState>();

        const localUser = ref<CompanyUserRegiserRequest>({
            companyId: Cookies.get('companyId'),
            name: '',
            email: '',
            password: ''
        });

        const handleSubmit = async () => {
            if (localUser && localUser.value.companyId) {
                // TODO: Add validation
                console.log('user registering: ' + JSON.stringify(localUser.value));
                const response = await CompanyUserService.userRegister(localUser.value);
                if (response.user) {
                    store.commit('companyUser/setUser', response.user)
                    router.push('/');
                } else {
                    console.log('something happened: ' + JSON.stringify(response));
                }
            }
        }

        return {
            localUser,
            handleSubmit
        }
    }
});

</script>

<style scoped>

</style>