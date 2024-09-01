<template>
  <v-app>
      <Header class="header"/>
      <v-main class="main-content">
        <router-view />
      </v-main>
      <Footer/>
  </v-app>
</template>

<script>
// Local Files
import Header from './components/template/Header.vue';
import Footer from './components/template/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
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
  color: #ff0000;
  min-height: 100vh; /* Ensure full height */
  min-width: 100vw;
}
.main-content {
  background-color: #ff0000; /* Example of using Vuetify's CSS variable */
}

</style>