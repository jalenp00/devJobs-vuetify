<template>
    <v-container class="pa-4" max-width="xs" @submit.prevent="handleSubmit">
      <v-card>
        <v-card-title>
          <h1>Login</h1>
        </v-card-title>
        
        <v-card-subtitle>
          <v-form>
            <v-text-field
                v-model="user.email"
                label="Email"
                placeholder="jalenpownell@something.com"
                prepend-icon="mdi-email"
                type="email"
                :error-messages="errors.email ? [errors.email] : []"
                @blur="validateField('email')"
            />
            <v-text-field
                v-model="user.password"
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

<script>
import { defineComponent, ref } from 'vue';
import validationService from '../../validationService/userVS';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'UserLoginForm',

  setup() {
    const user = ref({
      email: '',
      password: ''
    });

    const errors = ref({
      email: '',
      password: ''
    });

    const isFormValid = ref(false);
    const store = useStore();

    const validateField = async (field) => {
      try {
        await validationService.validateAt(field, user.value);
        errors.value[field] = '';
      } catch (error) {
        errors.value[field] = error.message;
      }
    };

    const handleSubmit = async () => {
      try {
        await validationService.validate(user.value, { abortEarly: false });
        console.log('Form is valid');
        
        loginUser();
      } catch (error) {
        if (error.inner) {
          error.inner.forEach(({ path, message }) => {
            errors.value[path] = message;
          });
        }
      }
    };

    const loginUser = async () => {
      try {
        await axios.post(API + '/user/', user.value);

        // TODO: Save to store and redirect to homepage
        store.commit('setUser', response.data);
        console.log(store);
        
      } catch (error) {
        console.log('Error: ' + error);
      }
    };

    return {
      user,
      errors,
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