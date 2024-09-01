<template>
    <v-container class="pa-4" max-width="xs">
      <v-card>
        <v-card-title>
          <h1>Sign Up</h1>
        </v-card-title>
        
        <v-card-subtitle>
          <v-form>
            <v-text-field
                v-model="user.name"
                label="Name"
                placeholder="Jalen Pownell"
                prepend-icon="mdi-name"
                type="text"
                required
            />
            <v-text-field
                v-model="user.email"
                label="Email"
                placeholder="jalenpownell@something.com"
                prepend-icon="mdi-email"
                type="email"
                required
            />
            
            <v-text-field
                v-model="user.password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                required
            />
            
            <v-btn
                @click="submitSignUp"
                color="primary"
                class="mt-4"
                block
            >
              Log in
            </v-btn>
  
            <v-card-subtitle class="mt-4">
              <v-btn
                text
                :to="{ path: '/signup' }"
              >
                Don't have an account? Sign Up
              </v-btn>
            </v-card-subtitle>
          </v-form>
        </v-card-subtitle>
      </v-card>
    </v-container>
  </template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent ({
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: ''
                },
                userDisplay: {
                    name: 'Enter your full name',
                    email: 'Enter your email',
                    password: 'Enter a password'
                },
                response: null
            };
        },
        methods : {
            submitSignUp() {
                //TODO
            }
        }
    });
</script>
