<template>
    <v-container class="pa-4" max-width="xs" @submit.prevent="handleSubmit">
      <v-card>
        <v-card-title>
          <h1>Login</h1>
        </v-card-title>
        
        <v-card-subtitle>
          <v-form>
            <v-text-field
                v-model="localUser.email"
                label="Email"
                placeholder="jalenpownell@something.com"
                prepend-icon="mdi-email"
                type="email"
                :error-messages="errors.email ? [errors.email] : []"
                @update:focused="validateField('email')"
            />
            <v-text-field
                v-model="localUser.password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                :error-messages="errors.password ? [errors.password] : []"
                @update:focused="validateField('password')"
            />
            <v-alert
            label="LoginError"
            v-if="loginError"
            type="error"
            > {{ loginError.message }}</v-alert>
            <v-btn
                @click="handleSubmit()"
                color="primary"
                class="mt-4"
                :disabled="isFormValid"
            >
              Log in
            </v-btn>
            <v-card-subtitle class="mt-4">
              <v-label>
                Dont have an account?
              </v-label>
              <v-btn
                class="hyperlink-text"
                :to="{ path: '/signup' }"
              >
                Sign Up
            </v-btn>
          </v-card-subtitle>
        </v-form>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { CompanyUserLoginRequest } from '../../types/companyUser';
import { defineComponent, ref, watch, computed } from 'vue';
import ValidationService from '../../validationService/userVS';
import CompanyUserService from '../../service/CompanyUserService';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { RootState } from '../../store/userStore';


export default defineComponent({
  name: 'CompanyUserLoginForm',

  setup() {

    const store = useStore<RootState>();
    const router = useRouter();


    const localUser = ref<CompanyUserLoginRequest>({
      email: '',
      password: ''
    });

    const loginError = ref<{message: string | undefined}>();

    const isFormValid = computed(() => {
      if (Object.keys(ValidationService.loginErrors.value).length === 0) {
        return false;
      }
      return true;
    });

    const validateField = async (field: string) => {
      if (localUser.value) {
        ValidationService.userLogin.value = localUser.value;
        await ValidationService.validateLoginField(field);
      }
    };
    
    const handleSubmit = async () => {
      if (localUser !== null) {
        ValidationService.userLogin.value = localUser.value;
        await ValidationService.validateLoginSubmit();
        if (isFormValid) {
          const response = await CompanyUserService.loginUser(localUser.value);
          if (response.user) {
            store.dispatch('companyUser/login', response.user);
            router.push('/company-dashboard');
          } else if (response.error) {
            loginError.value = { message: response.error} || 'An unexpected error occured.';
          }
        } else {
          console.log('Error validating form: ' + JSON.stringify(ValidationService.loginErrors.value));
        }
      } else {
        console.error('User is not initialized');
      }
      
    }

    watch(localUser, (newValue) => {
      if (newValue !== null) {
        ValidationService.userLogin.value = newValue;
      } else {
        // Handle the case where newValue is null, if necessary
        console.error('localUser is null');
      }
    });

    return {
      localUser,
      errors: ValidationService.loginErrors,
      loginError,
      isFormValid,
      validateField,
      handleSubmit
    };
  
  }
});
</script>

<style scoped>
.hyperlink-text {
  text-decoration: underline;
  color: #007bff; /* Bootstrap primary color or any color you prefer */
  padding: 0;
  min-width: auto;
  box-shadow: none;
  background: none;
  font-size: inherit; /* Ensure font size matches surrounding text */
  font-weight: normal; /* Ensure font weight matches surrounding text */
  line-height: 1; /* Remove extra line height */
}

.hyperlink-text:hover {
  text-decoration: underline;
  color: #0056b3; /* Darker color on hover */
  box-shadow: none;
  background: none;
}
</style>