import { Module } from 'vuex';
import { CompanyUserResponse } from 'types/companyUser';
import Cookies from 'js-cookie';
import CompanyUserService from '../service/CompanyUserService';

interface CompanyUserState {
  user: CompanyUserResponse | null;
}

const companyUserModule: Module<CompanyUserState, null> = {
  namespaced:true,
  state:  {
    user: null
  },
  mutations: {
    setUser(state, user: CompanyUserResponse) {
      // Set the user sate/Cookies to the user/user.id
      state.user = user;
      Cookies.set('companyUserId', user.id, { expires: 7, path: '/'});
      
      // Remove the companyUser Cookie because the user registered
      Cookies.remove('companyId');
    },
    clearUser(state) {
      state.user = null;
    },
    clearAll(state) {
      state.user = null;
      Cookies.remove('companyUserId');
    }
  },
  actions: {
    async fetchUser({ commit }) {
      console.log('-fetchUser called in companyUser Store Module-');
      const id = Cookies.get('companyUserId');
      if (id) {
        try {
          const response = await CompanyUserService.getUser(id);

          if (response.user) {
            commit('setUser', response.user);
          } else {
            console.log('error in companyUser Module: ' + response.errror);
          }
        } catch (error) {
          console.log('Failed to fetch user: ' + JSON.stringify(error));
          commit('clearUser');
        }
      }
    },
    login({ commit }, user) {
      commit('setUser', user);
      commit('setActiveModule', 'companyUser', { root: true });
    },
    signout({ commit }) {
      commit('clearAll');
      commit('setActiveModule', 'guest', { root: true });
    }
  },
  getters: {
    getCompanyId(state) {
      return state.user?.companyId;
    }
  }
};


export { companyUserModule, CompanyUserState } ;
