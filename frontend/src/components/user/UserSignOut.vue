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

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();
const store = useStore();

const dialog = ref(false);

const confirmSignOut = () => {

  store.dispatch('signOut').then(() => {
    console.log('User signed out');
    dialog.value = false;
    router.push('/');
  });
};

const cancelSignOut = () => {
  dialog.value = false;
};
</script>
