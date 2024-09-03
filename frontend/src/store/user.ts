import { createStore } from 'vuex';
import { UserResponse } from 'types/user';

interface State {
  user: UserResponse | null;
}

export default createStore<State>({
  state: {
    user: null,  // Add your initial state here
  },
  mutations: {
    setUser(state, user: UserResponse) {
      state.user = user;  // Mutation to update the user state
    },
    clearUser(state) {
      state.user = null;  // Mutation to clear the user state
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return !!state.user;  // Getter to check if user is authenticated
    },
    getUser(state): UserResponse | null {
      return state.user;  // Getter to return the user state
    },
  },
});
