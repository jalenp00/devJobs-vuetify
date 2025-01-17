<template>
    <v-container class="pa-4" max-width="xs" @submit.prevent="handleSubmit">
      <v-card>
        <v-card-title>
          <h1>Sign Up</h1>
        </v-card-title>
        <v-card-subtitle>
          <v-form>
            <v-text-field
                v-model="localUser.name"
                label="Name"
                placeholder="Jalen Pownell"
                type="text"
                :error-messages="errors.name ? [errors.name] : []"
                @blur="validateField('name')"
            />
            <v-text-field
                v-model="localUser.email"
                label="Email"
                placeholder="jalenpownell@something.com"
                prepend-icon="mdi-email"
                type="email"
                :error-messages="errors.email ? [errors.email] : []"
                @blur="validateField('email')"
            />
            
            <v-text-field
                v-model="localUser.password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                :error-messages="errors.password ? [errors.password] : []"
                @blur="validateField('password')"
            />
            <v-alert
            label="signUpError"
            v-if="signUpError"
            type="error"
            > {{ signUpError.message }}</v-alert>
            <v-btn
                @click="handleSubmit"
                color="primary"
                class="mt-4"
                block
            >
              Log in
            </v-btn>
            <v-card-subtitle class="mt-4">
              <v-label>Have an account?</v-label>
              <v-btn
                class="hyperlink-text"
                :to="{ path: '/get-started' }"
              >
                Login
              </v-btn>
            </v-card-subtitle>
          </v-form>
        </v-card-subtitle>
      </v-card>
    </v-container>
  </template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import ValidationService from '../../validationService/userVS';
import UserService from '../../service/UserService';
import { UserSignUpRequest } from '../../types/user';
import { useStore } from 'vuex';
import { RootState } from '../../store/userStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'UserSignUpForm',

  setup() {
    const router = useRouter();
    const store = useStore<RootState>();

    const localUser = ref<UserSignUpRequest>({
      name: '',
      email: '',
      password: ''
    });

    const signUpError = ref<{message: string | undefined}>();

    const isFormValid = computed(() => {
      if (Object.keys(ValidationService.signUpErrors.value).length === 0) {
        return false;
      }
      return true;
    });

    const validateField = async (field: string) => {
      if (localUser.value) {
        ValidationService.userSignUp.value = localUser.value;
        await ValidationService.validateSignUpField(field);
      }
    };
    
    const handleSubmit = async () => {
      if (localUser !== null) {
        ValidationService.userSignUp.value = localUser.value;
        await ValidationService.validateSignUpSubmit();
        if (isFormValid) {
          const response = await UserService.signUpUser(localUser.value);
          if (response.user) {
            store.commit('user/setUser', response.user);
            router.push('/');
          } else {
            signUpError.value = {message: response.message} || 'An unexpected error occured.';
          }
        } else {
          console.log('Error validating form: ' + JSON.stringify(ValidationService.signUpErrors.value));
        }
      } else {
        console.error('User is not initialized');
      }
      
    }

    watch(localUser, (newValue) => {
      if (newValue !== null) {
        ValidationService.userSignUp.value = newValue;
      } else {
        // Handle the case where newValue is null, if necessary
        console.error('localUser is null');
      }
    });

    return {
      localUser,
      errors: ValidationService.signUpErrors,
      signUpError,
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