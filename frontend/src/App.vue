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

export default {
  name: 'App',
  components: {
    // Not currently using the header, can adjust later
    //Header,
    NavBar,
    Footer
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