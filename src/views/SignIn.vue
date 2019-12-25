<template>
  <div>
    login

    <div v-if="errors.length" class="dang">
      <ul>
        <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
      </ul>
    </div>
    <form @submit.prevent="onSubmit">
      <label for="user">Username:</label>
      <input type="text" id="user" v-model="username" placeholder />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" placeholder />

      <button type="submit">login</button>
    </form>

    <div class="dang" v-if="errorMessage">{{errorMessage}}</div>
    <router-link to="signup">Sign Up</router-link>
  </div>
</template>

<script>
import UserService from "../api/user.api";
export default {
  // name: "signin",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
      errorMessage: ""
    };
  },
  methods: {
    onSubmit() {
      if (!this.username || !this.password) {
        if (!this.username) this.errors.push("Username is required.")
        if (!this.password) this.errors.push("Password is required.")
        return
      }

      UserService.SignIn({
        login: this.username,
        password: this.password
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ path: "/" });
        })
        .catch(e => {
          this.errorMessage = e.response.data;
        });
    }
  }
};
</script>

<style scoped>
.dang {
  color: red;
}
</style>