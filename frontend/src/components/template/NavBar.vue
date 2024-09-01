<template>
  <v-toolbar app dense>
    <v-container fluid>
      <v-row> 
        <v-col cols="auto" id="title">
          <v-btn text :to="{ path: '/' }" justify="space-between">
            <v-toolbar-title>devJobs</v-toolbar-title>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end" cols="auto" id="items">
          <v-btn text :to="{ path: '/job' }">Job</v-btn>
          <UserLogin/>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script lang="ts">
import UserLogin from '../user/UserLogin.vue';

export default {
  name: 'NavBar',
  components: {
    UserLogin: UserLogin
  }
};
</script>

<style scoped>
.v-btn {
  font-weight: bold;
  color: #cccccc;
}

.v-toolbar {
  background-color: rgb(78, 78, 78);
}
#title {
  margin-right: 70pc;
}
</style>
