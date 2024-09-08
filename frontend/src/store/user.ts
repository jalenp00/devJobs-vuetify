import { Module } from 'vuex';
import { UserResponse } from 'types/user';
import UserService from '../service/UserService';
import Cookies from 'js-cookie';

interface UserState {
  user: UserResponse | null;
}

const userModule: Module<UserState, null> = {
  namespaced:true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, user: UserResponse) {
      state.user = user;
      Cookies.set('userId', user.id, { expires: 7, path: '/'});
    },
    clearUser(state) {
      state.user = null;
    },
    clearAll(state) {
      state.user = null;
      Cookies.remove('userId');
    }
  },
  actions: {
    async fetchUser({ commit }) {
      console.log('-fetchUser called in user Store Module-');
      const id = Cookies.get('userId');
      console.log('userId in fetch user: ' + JSON.stringify(id));
      if (id) {
        try {
          const response = await UserService.getUser(id);
          console.log('response from getting user from service: ' + JSON.stringify(response));
          if (response.user) {
            commit('setUser', response.user);
          } else {
            console.log('error returned in user module: ' + JSON.stringify(response.error));
          }
        } catch (error) {
          console.log('Failed to fetch user: ' + JSON.stringify(error));
          commit('clearUser');
        }
      }
    },
    login({ commit }, user) {
      commit('setUser', user);
      commit('setActiveModule', 'user', { root: true });
    },
    signOut({ commit }) {
      commit('clearAll');
      commit('setActiveModule', 'guest', { root: true });
    }
  }
};

export { userModule, UserState };