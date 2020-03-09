const state = {
    title: '',
    text: '',
}

const getters = {}

const mutations = {
    setTitle (state, title) {
        state.title = title
    },
    setText (state, text) {
        state.text = text
    },
    setCursor (state, cursor) {
        state.cursor = cursor
    },
    setBoardData (state, { title, text }) {
        state.title = title;
        state.text = text;
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}