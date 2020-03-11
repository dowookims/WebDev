import api from '../../api';

const state = {
    tabList: [{title: 'undefined', text:'', saved: false}],
    defaultTab: {title: 'undefined', text:'', saved: false},
    selectedTab: 0,
    cursor: 0
}

const getters = {}

const mutations = {
    createTab(state, payload) {
        state.tabList= [...state.tabList, {...payload}];
    },
    setTabList(state, payload) {
        state.tabList = payload
    },
    setSelectedTab (state, payload) {
        state.selectedTab = payload
    },
    setCursor (state, payload) {
        state.cursor  = payload
    },
    setTabData (state, {tabList, selectedTab, cursor}) {
        state.tabList = tabList || [];
        state.selectedTab = selectedTab || 0;
        state.cursor= cursor || 0;
    }
}

const actions = {
    async setTabData ({ commit }, { userId, token }) {
        const result = await api.getUserData(userId, token);
        const { tabs, selectedTab, cursor, hasState } = result.data;
        if (tabs) {
            commit('setTabList', tabs);
        }
        commit('setSelectedTab', selectedTab || 0);
        commit('setCursor', cursor || 0);
        return { tabs, selectedTab, cursor, hasState};
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}