import api from '../../api';

const state = {
    tabList: [{title: 'undefined', text:''}],
    defaultTab: {title: 'undefined', text:''},
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
    async setTabData ({ commit }, payload) {
        const result = await api.getUserData(payload.userId, payload.token);
        const { tabs, selectedTab, cursorLen, userId } = result.data.data.userWorkingState;
        if (tabs) {
            commit('setTabList', tabs)
            // commit('setTabList', JSON.parse(tabs.replace(/'/g, '"')));
        }
        const hasState = userId ? true : false
        commit('setSelectedTab', selectedTab || 0);
        commit('setCursor', cursorLen || 0);
        return { tabs, selectedTab, cursor: cursorLen, hasState};
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}