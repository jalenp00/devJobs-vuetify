// Vue
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/user'
//Router
import router from './router'

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives
});

createApp(App)
.use(vuetify)
.use(router)
.use(store)
.mount('#app')
