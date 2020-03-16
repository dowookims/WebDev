import TabList from "../TabList.vue";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import Vuex from 'vuex'
import vuexstore from '../../store'
import Tab from '../Tab.vue'
import Icon from "../Icon.vue"

const localVue = createLocalVue()
localVue.use(Vuex);

describe("TabList", () => {
    // given
    let store,
    wrapper;

    beforeEach(() => {
        store = new Vuex.Store(vuexstore);
        wrapper = mount(TabList, { store, localVue });
    })

    test("TabList Appear", () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    test("Icon Length", () => {
        expect(wrapper.findAll(Icon).wrappers.length).toBe(5)
    })
    test("Tab exist", () => {
        console.log("ASD", wrapper.findAll(Tab).wrapper)
        console.log("QWE", wrapper.vm.$store.state.auth.isLogin)
        expect(wrapper.findAll(Tab).wrappers.length).toBe(1)
    })
})