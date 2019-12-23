<template>
  <div>
    login
    <div>
      <label for="user">Username:</label>
      <input type="text" id="user" v-model="username" placeholder />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" placeholder />

      <button v-on:click="login">login</button>
    </div>
    <div class="dang" v-if="errorMessage">{{errorMessage}}</div>
  </div>
</template>

<script>
export default {
  // name: "signin",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    login() {
      this.axios
        .post("http://localhost:3000/auth/login", {
          login: this.username,
          password: this.password
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          this.$router.push({ path: '/'})
        })
        .catch((e) => {
          this.errorMessage = e;
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