import api from '../../api';

const state = {
    isLogin: false,
    userId: '',
    username: '',
}

const getters = {}

const mutations = {
    setIsLogin (state, payload) {
        state.isLogin = payload
    },
    setUserId (state, payload) {
        state.userId = payload
    },
    setUserName(state, payload) {
        state.username = payload;
    }
}

const actions = {
    async setLogin ({ commit }, payload) {
        try {
            const res = await api.login(payload);
            const isLogin = res.data.isLogin;
            console.log("RES", res)
            commit('setIsLogin', isLogin);

            if (isLogin) {
                const res2 = await api.getUserData();
                console.log("RES2", res2);
                const { userId, username } = res.data;
                commit('setUserId', userId);
                commit('setUserName', username);
                return true
            }
            return false
        } catch (e) {
            console.error(e)
        }
    },

    async setLogout ({ commit }) {
        try {
            const res = await api.logout();
            if (res.data.result) {
                commit('setUserId', '');
                commit('setIsLogin', false);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}