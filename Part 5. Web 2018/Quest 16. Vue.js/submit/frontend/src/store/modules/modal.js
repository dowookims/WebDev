import api from '../../api'

const state = {
    open: false,
    files: []
}

const getters = {}

const mutations = {
    setOpen(state) {
        state.open = !state.open
    },
    setFiles(state, payload) {
        state.files = payload
    }
}

const actions = {
    async getAllPosts({commit}, token) {
        const files = await api.getAllPost(token);
        commit('setFiles', files.data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}