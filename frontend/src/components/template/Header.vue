<template>
    <v-app-bar app dense >
      <v-container fluid>
        <NavBar/>
      </v-container>
    </v-app-bar>
  </template>
  
<script lang="ts">
import NavBar from './NavBar.vue';

export default {
components: {
    NavBar
}
};
</script>

<style scoped>
/*
.v-container {
  min-width: 100pc;
  max-height: 10pc;
  padding-left: 0;
  padding-right: 0;
}
*/
</style>
  