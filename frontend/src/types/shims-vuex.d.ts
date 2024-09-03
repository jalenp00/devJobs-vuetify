import { Store } from 'vuex';
import { State } from './store/types'; // Adjust path if necessary

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
