// Vue
import { createApp } from 'vue'
import App from './App.vue'

//Router
import router from './router'

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

// Stores
import { UserStore } from './store/userStore'
import Cookies from 'js-cookie';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives
});

const app = createApp(App);

app.use(vuetify);
app.use(router);

app.use(UserStore);

UserStore.dispatch('initializeStore');

app.mount('#app')
