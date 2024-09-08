<template>
    <div>
      <!-- Sign Out Button -->
      <v-btn color="error" @click="dialog = true">Sign Out</v-btn>
  
      <!-- Confirmation Dialog -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Confirm Sign Out</v-card-title>
          <v-card-text>Are you sure you want to sign out?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text="true" @click="cancelSignOut">Cancel</v-btn>
            <v-btn color="error" @click="confirmSignOut">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent } from 'vue';
  import { mapActions } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default defineComponent ({
    methods: {
      ...mapActions('companyUser', ['signOut']),
      async confirmSignOut() {
        await this.signOut();
        this.dialog = false;
        console.log('signed out user');
        this.router.push('/');
      }
    },
    setup() {
      const router = useRouter();
  
      const dialog = ref(false);
  
      const cancelSignOut = () => {
        dialog.value = false;
      };
      return {
        router,
        dialog,
        cancelSignOut
      }
    }
  })
  
  
  </script>
  