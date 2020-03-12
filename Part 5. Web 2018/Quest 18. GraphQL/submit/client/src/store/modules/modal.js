import api from '../../api'

const state = {
    open: false,
    files: [],
    selectedItem: null,
}

const getters = {}

const mutations = {
    setOpen(state) {
        state.open = !state.open
    },
    setFiles(state, payload) {
        state.files = payload
    },
    setSelectedItem(state, payload) {
        state.selectedItem = payload;
    }
}

const actions = {
    async getAllPosts({commit}, payload) {
        const files = await api.getAllPost(payload.userId, payload.token);
        commit('setFiles', files.data.data.posts)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}