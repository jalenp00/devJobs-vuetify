import { createStore } from 'vuex';
import { UserResponse } from 'types/user';
import Cookies from 'js-cookie';

interface State {
  user: UserResponse | null;
}

const store = createStore<State>({
  state: {
    user: null,  // Add your initial state here
  },
  mutations: {
    setUser(state, user: UserResponse) {
      state.user = user;  // Mutation to update the user state
    },
    clearUser(state) {
      state.user = null;  // Mutation to clear the user state
    }
  },
  actions: {
    signOut({ commit }) {
      commit('clearUser');
    }
  },
  plugins: [
    (store) => {
      // Subscribe to store changes and save the state to cookies
      store.subscribe((mutation, state) => {
        if (mutation.type === 'clearUser') {
          const cookies = Cookies.get();
          Object.keys(cookies).forEach(cookie => {
            Cookies.remove(cookie, { path: '/' });
          });
        } else {
          Cookies.set('store', JSON.stringify(state), { expires: 7, path: '/' }); // Expires in 7 days
        }
      });
    }
  ]
});

// Load state from cookies on store creation
const savedState = Cookies.get('store');

if (savedState) {
  store.replaceState(JSON.parse(savedState));
}

export default store;