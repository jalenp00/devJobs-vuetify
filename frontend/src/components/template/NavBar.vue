<template>
   <!-- :style="{ '--toolbar-height': height,
    '--toolbar-font-size': fontSize}" -->
  <v-toolbar app>
    <v-container  
    class="d-flex justify-space-between align-center"
    >
      <v-btn :to="{ path: '/' }">
        <v-toolbar-title>devJobs</v-toolbar-title>
      </v-btn>
      <v-divider class="d-flex justify-end" 
      :style= "{'font-size': fontSize}"
      >
        <v-divider v-if="activeModule === 'guest'">
          <About/>
          <UserLogin/>
          <UserSignUp/>
          <CompanyRegister/>
          <CompanyUserLogin/>
        </v-divider>
        <v-divider v-else-if="activeModule === 'user'">
          <UserSignOut/>
        </v-divider>
        <v-divider v-if="activeModule === 'companyUser'">
          <CompanyUserSignOut/>
        </v-divider>
      </v-divider>
    </v-container>
  </v-toolbar>
</template>

<script lang="ts">
import UserLogin from '../user/UserLogin.vue';
import About from '../public/About.vue'
import UserSignOut from '../user/UserSignOut.vue';
import CompanyUserSignOut from '../companyuser/UserSignOut.vue';
import UserSignUp from '../user/UserSignUp.vue';
import CompanyRegister from '../company/companyRegister.vue';
import CompanyUserLogin from '../companyuser/UserLogin.vue';
import { useDisplay } from 'vuetify';
import { computed, ref, watch, defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'NavBar',
  components: {
    UserLogin,
    About,
    UserSignOut,
    UserSignUp,
    CompanyRegister,
    CompanyUserLogin,
    CompanyUserSignOut
  },
  computed: {
    ...mapState(['activeModule'])
  },
  setup() {
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

    return {
      height,
      fontSize
    }
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
