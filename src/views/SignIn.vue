<template>
  <div class="container-fluid">
     <div class="col-md-4 col-md-offset-5 form-content">
      <div class="card text-center">
      <div class="card-header">
          <h4>Sign in</h4>
        </div>
        <div class="card-body">
          <div v-if="errors.length" class="dang">
            <ul>
              <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
            </ul>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="form-group form-content">
              <label for="username">Username</label>
              <input type="text" id="user" class="form-control" placeholder="Username"  v-model="username" >
            </div>
            <div class="form-group form-content">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" class="form-control" placeholder="Password">
            </div>
             <div class="dang pt-3" v-if="errorMessage">{{errorMessage}}</div>
            <button type="submit" class="btn btn-primary mt-4">Log in</button>
          </form>
        </div>
        <div class="card-footer">
          <router-link to="signup">Sign Up</router-link>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import UserAPI from "../api/user.api";
import bus from "../eventBus"
export default {
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

      UserAPI.SignIn({
        login: this.username,
        password: this.password
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "profile" });
          bus.$emit('on-siginin')
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

.form-content {
  margin: auto;
  text-align: left
}

h4 {
  text-align: center;
}

.form-content {
  text-align: left;
  padding-top: 1rem;
}
</style>