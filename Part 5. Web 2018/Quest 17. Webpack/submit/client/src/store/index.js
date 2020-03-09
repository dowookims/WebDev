import Vue from 'vue';
import Vuex from "vuex";

import icon from './modules/icon';
import tab from './modules/tab';
import board from './modules/board';
import auth from './modules/auth';
import modal from './modules/modal';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        icon,
        tab,
        board,
        auth,
        modal
    }
});