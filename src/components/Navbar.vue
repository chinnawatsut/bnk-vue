<template>
  <div class="pb-4">
    <nav v-if ="isContainProfile" class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row-reverse">
      <button
        id="logoutBtn"
        class="btn btn-outline-warning my-2 my-sm-0"
        type="submit"
        v-on:click="logout"
      >Logout</button>
      <span class="profile-name">
        Hi!
        <router-link class="pr-3 text-light" to="/profile">{{ profile.display }}</router-link>
      </span>

      <router-link class="pr-3 text-light" to="/profile">
        <span :class="[currentPage.includes('profile') ? activateClass: '']">Profile</span>
      </router-link>
      <router-link class="pr-3 text-light" to="/">
        <span :class="[currentPage == '/' ? activateClass: '']">Home</span>
      </router-link>
    </nav>
    <nav
      v-if  ="!isContainProfile"
      class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row-reverse"
    ></nav>
  </div>
</template>

<script>
import UserService from "../api/user.api";
import LocalStorageService from "../api/localStorage";

export default {
  mounted() {
    this.getProfile();
  },
  data() {
    return {
      profile: {
        display: ''
      },
      activateClass: "active"
    };
  },
  methods: {
    logout() {
      LocalStorageService.removeToken();
      this.$router.push({ path: "/signin" });
      this.profile = {};
    },
    getProfile() {
      UserService.GetProfile().then(response => {
        // not call when just login
        this.profile = response.data;
      })
      .catch(error => {
        let { data, status , statusText} = error.response;
        if (status === 500) {
          this.logout()
          return
        }
      });
    }
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },
    isContainProfile() {
      return this.profile.display
    }
  }
};
</script>

<style scoped>
.navbar {
  min-height: 50px;
}
.profile-name {
  color: aliceblue;
}
.white {
  color: aliceblue;
}
.active {
  opacity: 1;
  visibility: visible;
  border-bottom: 10px solid aquamarine;
  margin: 10px;
  transition: all 0.5s;
}
</style>