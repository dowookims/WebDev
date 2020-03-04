const state = {
    tabList: [{title: 'undefined', text:''}],
    selectedTab: null
}

const getters = {}

const mutations = {
    createTab(state) {
        state.tabList.push({title: 'undefined', text:''})
    },
}

const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}