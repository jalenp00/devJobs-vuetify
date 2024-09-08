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
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import NavBar from '../../components/template/NavBar.vue';
import { UserResponse } from 'types/user';

export default {
  components: {
    NavBar
  },
  setup() {
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
