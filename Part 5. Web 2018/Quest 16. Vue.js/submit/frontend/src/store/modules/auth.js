import api from '../../api';

const state = {
    isLogin: false,
    userId: '',
    nickname: '',
    token: null,
}

const getters = {}

const mutations = {
    setIsLogin (state, payload) {
        state.isLogin = payload
    },
    setUserId (state, payload) {
        state.userId = payload
    },
    setNickame(state, payload) {
        state.username = payload;
    },
    setToken(state, payload) {
        state.token = payload;
    }
}

const actions = {
    async setLogin ({ commit }, payload) {
        try {
            const res = await api.login(payload);
            const { isLogin, userId, nickname, token } = res.data;
            commit('setIsLogin', isLogin);
            commit('setToken', token);
            commit('setUserId', userId);
            commit('setNickame', nickname);
            
            if (isLogin) {
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