<template>
  <v-container fluid>
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

.v-container {
  background-color: rgb(34, 17, 50);
  min-width: 100pc;
  max-height: 100pc;
  padding-left: 0;
  padding-right: 0;
}
</style>
