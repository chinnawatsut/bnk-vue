<template>
  <div class="pb-4">
    <nav v-if="profile" class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row-reverse">
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
    </nav>
    <nav
      v-if="!profile"
      class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row-reverse"
    >
    </nav>
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
      profile: null
    };
  },
  methods: {
    logout() {
      LocalStorageService.removeToken();
      this.$router.push({ path: "/signin" });
    },
    async getProfile() {
      let profile = await UserService.GetProfile().then(r => r.data);
      this.profile = profile;
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
</style>