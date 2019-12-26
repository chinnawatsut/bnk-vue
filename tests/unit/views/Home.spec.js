import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from 'vue-router';
import Home from "@/views/Home.vue";
import BnkService from '../../../src/api/bnk.api'
import LocalStorageService from '../../../src/api/localStorage'
import flushPromises from 'flush-promises'


jest.mock('../../../src/api/bnk.api', () => ({
  getAllMembers: jest.fn()
}))
jest.mock('../../../src/api/localStorage', () => ({
  removeToken: jest.fn()
}))

describe("Home.vue", () => {
  let localVue, router
  let mockGetAllMembersSuccess = {
    data: [
      {
        _id: "",
        name: 'cherprang',
        imgUrl: "",
        instagramId: "",
      }
    ],
  }

  function createWrapper() {
    return shallowMount(Home, {
      localVue,
      router,
    });
  }
  
  function createWrapperWithMockMethod() {
    const getMember = jest.fn()
    return shallowMount(Home, {
      localVue,
      router,
      method: {
        getAllMembers: getMember
      },
    });
  }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter()
    BnkService.getAllMembers.mockClear();
  });

  it("should call get member when created", () => {
    let getMember = jest.fn();

    shallowMount(Home, {
      localVue,
      router,
      methods: {
        getMember
      },
    });
   
    expect(getMember).toHaveBeenCalled();
  });

  it("should set member when it call getMember success", async () => {
    BnkService.getAllMembers.mockResolvedValue(mockGetAllMembersSuccess)

    const wrapper = createWrapper();

    await flushPromises()

    expect(BnkService.getAllMembers).toHaveBeenCalled()
    expect(wrapper.vm.members.length).toEqual(1)
  });

  it("should set errorMessage when it call getMember failed", async () => {
    BnkService.getAllMembers.mockImplementation(() => Promise.reject({
      message: 'cannot retrieve data',
    }))

    const wrapper = createWrapper();

    await flushPromises()

    expect(BnkService.getAllMembers).toHaveBeenCalled()
    expect(wrapper.vm.errorMessage).toEqual("cannot retrieve data")
  });

  it("should call removeToken when click logout", () => {
    const wrapper = createWrapperWithMockMethod()

    wrapper.find('#logoutBtn').trigger('click')
    
    expect(LocalStorageService.removeToken).toHaveBeenCalled();
  });

  it("should route to sigin when click logout", () => {
    const route = spyOn(router, 'push')
    const wrapper = createWrapperWithMockMethod()

    wrapper.find('#logoutBtn').trigger('click')

    expect(route).toHaveBeenCalledWith({ path: "/signin" });
  });
});
