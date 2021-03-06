import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from 'vue-router';
import LocalStorageService from '../../../src/api/localStorage'
import UserAPI from '../../../src/api/user.api'
import flushPromises from 'flush-promises'
import Navbar from '@/components/Navbar'

jest.mock('../../../src/api/user.api', () => ({
  GetProfile: jest.fn()
}))
jest.mock('../../../src/api/localStorage', () => ({
  removeToken: jest.fn(),
  getToken: jest.fn().mockReturnValue(true),
}))

describe("Navbar.vue", () => {
  let localVue, router
 
  function createWrapper() {
    return shallowMount(Navbar, {
      localVue,
      router,
    });
  }
  

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter()
  });

 
  it("should call removeToken when click logout and route to signIn", async() => {
    UserAPI.GetProfile.mockResolvedValue({ data: { display: "john" }})

    const route = spyOn(router, 'push')
    const wrapper = createWrapper()
    
    await flushPromises()

    wrapper.find('#logoutBtn').trigger('click')

    expect(LocalStorageService.removeToken).toHaveBeenCalled();
    expect(route).toHaveBeenCalledWith({ path: "/signin" });
  });

});
