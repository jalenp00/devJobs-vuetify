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
.mount('#app')
