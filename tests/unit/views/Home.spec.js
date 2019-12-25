import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from 'vue-router';
import Home from "@/views/Home.vue";
import BnkService from '../../../src/api/bnk.api'

jest.mock('../../../src/api/bnk.api', () => ({
  getAllMembers: jest.fn(() => Promise.resolve({
    data: [
      { 
        _id: "",
        name: 'cherprang',
        imgUrl: "",
        instagramId: "",
      }
    ],
  }))
}))

describe("Home.vue", () => {
  let localVue, router
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter()
  });
  
  it("should call get member when created", () => {
    const getMember = jest.fn();

    shallowMount(Home, {
      localVue,
      router,
      methods: {
        getMember
      }
    });

    expect(getMember).toHaveBeenCalled();
  });

  it("should set member when it call getMember success", async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      router,
    });

    await wrapper.vm.$nextTick()

    expect(BnkService.getAllMembers).toHaveBeenCalled()
    expect(wrapper.vm.members.length).toEqual(1)
  });

});
