<template>
  <div>
    <h1>Registration</h1>
    <label for="username">Username:</label>
    <input type="text" id="username" v-model="username" />

    <label for="displayname">Display name:</label>
    <input type="text" id="displayname" v-model="display" />

    <label for="email">E-mail:</label>
    <input type="email" id="email" v-model="email" />

    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" />

    <button v-on:click="signup">Sign Up</button>

    <div v-show="showSuccess">
      Register success: {{ username }}
      <router-link to="signin">Sign In</router-link>
    </div>
    <div v-show="errorMessage" class="dang">{{ errorMessage }}</div>
  </div>
</template>

<script>
import UserService from "../api/user.api";
export default {
  data() {
    return {
      username: "",
      display: "",
      email: "",
      password: "",
      showSuccess: false,
      errorMessage: ""
    };
  },
  methods: {
    signup() {
      const requestBody = {
        login: this.username,
        display: this.display,
        email: this.email,
        password: this.password
      };
      UserService.SignUp(requestBody)
        .then(response => {
          this.showSuccess = true;
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
  color: brown;
}
</style>