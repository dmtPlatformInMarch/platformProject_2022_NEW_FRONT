import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
    getAuthFromCookie,
    getUserFromCookie,
    saveAuthToCookie,
    saveUserToCookie,
} from '@/utils/cookies';
import { loginUser, signinUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        username: getUserFromCookie() || '',
        token: getAuthFromCookie() || '',
        role: '',
    },
    getters: {
        isLogin(state) {
            return state.username !== '';
        },
        getUsername(state) {
            return state.username;
        },
        getRole(state) {
            return state.role;
        },
        isManager(state) {
            return state.role === 'ROLE_MANAGER';
        },
        isAdmin(state) {
            return state.role === 'ROLE_ADMIN';
        },
        isWorker(state) {
            return state.role === 'ROLE_WORKER';
        },
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        clearUsername(state) {
            state.username = '';
        },
        setToken(state, token) {
            state.token = token;
        },
        clearToken(state) {
            state.token = '';
        },
        clearRole(state) {
            state.role = '';
        },
        setUserRole(state, userRole) {
            console.log('userRole : ' + userRole);
            state.role = userRole;
        },
    },
    actions: {
        async LOGIN({ commit }, userData) {
            const { data } = await loginUser(userData);
            console.log(data.token);
            commit('setToken', data.token);
            commit('setUsername', data.email);
            saveAuthToCookie(data.token);
            saveUserToCookie(data.email);
            commit('setUserRole', data.roleName);
            return data;
        },
        async SIGNIN({ commit }, userData) {
            const { data } = await signinUser(userData);
            console.log(data.token);
            commit('setToken', data.token);
            commit('setUsername', data.email);
            saveAuthToCookie(data.token);
            saveUserToCookie(data.email);
            console.log('roleName : ' + data.roleName);
            commit('setUserRole', data.roleName);
            return data;
        },
    },
});
