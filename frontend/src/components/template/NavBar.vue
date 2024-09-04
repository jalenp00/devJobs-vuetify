<template>
   <!-- :style="{ '--toolbar-height': height,
    '--toolbar-font-size': fontSize}" -->
  <v-toolbar app
 
  >
    <v-container  
    class="d-flex justify-space-between align-center"
    >
      <v-btn :to="{ path: '/' }">
        <v-toolbar-title>devJobs</v-toolbar-title>
      </v-btn>
      <div class="d-flex justify-end" :style= "{'font-size': fontSize}"
      >
        <About/>
        <UserLogin/>
        <UserSignOut/>
      </div>
    </v-container>
  </v-toolbar>
</template>

<script setup lang="ts">
import UserLogin from '../user/UserLogin.vue';
import About from '../user/UAbout.vue'
import UserSignOut from '../user/UserSignOut.vue';
import { useDisplay } from 'vuetify';
import { computed } from 'vue';

const { name } = useDisplay();

const height = computed(() => {
  console.log(name.value);
  switch (name.value) {
    case 'xs': return '8%'
    case 'sm': return '8%'
    case 'md': return '8%'
    case 'lg': return '8%'
    case 'xl': return '5%'
    case 'xxl': return '5%'
    default: return 'auto'
  }
});

const fontSize = computed(() => {
  switch (name.value) {
    case 'xs': return '1.25rem';
    case 'sm': return '1.25rem';
    case 'md': return '1.5rem';
    case 'lg': return '1.5rem';
    case 'xl': return '1.5rem';
    case 'xxl': return '1.65rem';
    default: return '1rem';
  }
});
</script>

<style scoped>
.v-btn {
  font-weight: bold;
  color: #cccccc;
}

.v-toolbar {
  background-color: rgb(78, 78, 78);
}
</style>
