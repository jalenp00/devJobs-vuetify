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
            <v-btn
                @click="handleSubmit()"
                color="primary"
                class="mt-4"
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
import { UserLoginRequest } from '../../types/user';
import { defineComponent, ref, watch } from 'vue';
import validationService from '../../validationService/userVS';
import UserService from '../../service/UserService';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'UserLoginForm',

  setup() {
    const localUser = ref<UserLoginRequest>({
      email: '',
      password: ''
    });

    const isFormValid = ref(false);
    const store = useStore();
    const router = useRouter();

    const validateField = async (field: string) => {
      if (localUser.value) {
        validationService.userLogin.value = localUser.value;
        await validationService.validateLoginField(field);
      }
    };

    const handleSubmit = async () => {
      if (localUser !== null) {
        validationService.userLogin.value = localUser.value;
        await validationService.validateLoginSubmit();
        if (Object.keys(validationService.errors.value).length === 0) {
          const response = await UserService.loginUser(localUser.value);
          if (response) {
            store.commit('setUser', response);
            router.push('/');
          } else {
            console.log('Login in service is not working right now.')
          }
        } else {
          console.log('Error validating form: ' + JSON.stringify(validationService.errors.value));
        }
      } else {
        console.log('User is empty.');
      }
    }

    watch(localUser, (newValue) => {
      if (newValue !== null) {
        validationService.userLogin.value = newValue;
      } else {
        // Handle the case where newValue is null, if necessary
        console.error('localUser is null');
      }
    });

    return {
      localUser,
      errors: validationService.errors,
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