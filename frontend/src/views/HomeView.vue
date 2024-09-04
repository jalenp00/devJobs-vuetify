<template>
  <v-container fluid class="homepage-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card outlined>
          <v-card-title>
            <h1 class="headline">Welcome to Dev Jobs</h1>
          </v-card-title>
          <v-card-subtitle>
            <p>A place to find a new job.</p>
            <template v-if="user">
              <v-divider></v-divider>
              <v-card-text>
                <p><strong>Name:</strong> {{ user.name }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
              </v-card-text>
            </template>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import NavBar from '../components/template/NavBar.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    NavBar
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    return { user };
  }
}
</script>

<style scoped>
.headline {
  font-size: 2.5rem; /* Adjust the font size as needed */
  font-weight: bold;
}

.homepage-container {
  background-color: rgb(53, 51, 55);
  min-height: 100vh; /* Use viewport height */
  width: 100vw; /* Use viewport width */
  padding: 0; /* Adjust padding as needed */
}
</style>
