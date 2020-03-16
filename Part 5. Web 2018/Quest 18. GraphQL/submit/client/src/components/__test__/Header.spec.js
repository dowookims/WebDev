import { mount } from "@vue/test-utils";
import Header from "../Header.vue";

describe("Header Component", () => {
    test("Header appeared", () => {
        const wrapper = mount(Header);
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    test("Header text is Knowre Pad", () => {
        const wrapper = mount(Header);
        expect(wrapper.text()).toEqual("Knowre Pad")
    })
})