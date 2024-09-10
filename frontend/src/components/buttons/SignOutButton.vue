<template>
  <div>
    <v-btn v-if="activeModule === 'companyUser'" @click="dialog = true"
    >Sign Out</v-btn>

    <v-btn v-else-if="activeModule === 'user'" @click="dialog = true"
    >Sign Out</v-btn>

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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'SignOut',
  props: {
    activeModule: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const dialog = ref(false);

    const cancelSignOut = () => {
      dialog.value = false;
    };

    const confirmSignOut = async () => {
      await store.dispatch(`${props.activeModule}/signout`);
      dialog.value = false;
      console.log('signed out user');
      router.push('/');
    };

    return {
      router,
      dialog,
      cancelSignOut,
      confirmSignOut,
    };
  },
});
</script>
