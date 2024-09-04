<template>
  <v-app>
      <NavBar/>
      <v-main class="main-content">
        <router-view />
      </v-main>
      <Footer/>
  </v-app>
</template>

<script>
// Local Files
//import Header from './components/template/Header.vue';
import Footer from './components/template/Footer.vue';
import NavBar from './components/template/NavBar.vue';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import UserService from './service/UserService'
import { onMounted } from 'vue';

export default {
  name: 'App',
  components: {
    // Not currently using the header, can adjust later
    //Header,
    NavBar,
    Footer
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const userId = Cookies.get('userId');
      const isValidated = Cookies.get('isValidated') === 'true'; // Cookies values are strings

      if (userId && isValidated) {
        try {
          const userDetails = await UserService.getUser(userId);
          store.commit('setUser', userDetails);
        } catch (err) {
          console.error('Failed to fetch user details', err);
        }
      }
    });

    return {};
  }
};
</script>

<style scoped>

.v-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;  /* Ensure full height */
  min-width: 100vw;
  
}
.main-content {
  background-color: #565656; /* Example of using Vuetify's CSS variable */
}
</style>