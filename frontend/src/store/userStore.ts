import { createStore, Module } from 'vuex';
import { userModule, UserState } from './user';
import { companyUserModule, CompanyUserState } from './companyUser';
import Cookies from 'js-cookie';

interface RootState {
    activeModule: string;
    user: UserState | null;
    companyUser: CompanyUserState | null;
}

const UserStore = createStore<RootState>({
    modules: {
        user: userModule as unknown as Module<UserState, RootState>,
        companyUser: companyUserModule as unknown as Module<CompanyUserState, RootState>,
    },
    state: (): RootState => ({
        activeModule: '',
        user: null,
        companyUser: null
    }),
    mutations: {
        setActiveModule(state, module) {
            state.activeModule = module;
        }
    },
    actions: {
        async initializeStore({ commit }) {
            console.log('-initializeStore in userStore.ts-')
            const userId = Cookies.get('userId');
            const companyUserId = Cookies.get('companyUserId');
            console.log('userId in Store: ' + JSON.stringify(userId));
            console.log('compnayUserId in Store' + JSON.stringify(companyUserId));

            if (userId) {
                console.log('user id is hit in user store');
                await this.dispatch('user/fetchUser');
                commit('setActiveModule', 'user');
            } else if (companyUserId) {
                await this.dispatch('companyUser/fetchUser');
                commit('setActiveModule', 'companyUser');
            } else {
                console.log('else is hit in user store');
                commit('setActiveModule', 'guest');
            }
        },
        setActiveModule({ commit }, module) {
            commit('setActiveModule', module);
        }
    }
});

export { UserStore, RootState };