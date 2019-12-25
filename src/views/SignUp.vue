<template>
  <div class="container-fluid">
     <div class="col-md-4 col-md-offset-5 form-content">
      <div class="card text-center">
      <div class="card-header">
          <h4>Registration</h4>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group form-content">
              <label for="username">Username</label>
              <input type="text" id="user" class="form-control" placeholder="Username"  v-model="username" >
            </div>
            <div class="form-group form-content">
              <label for="displayname">Display name</label>
              <input type="text" id="displayname"  class="form-control" placeholder="Display name" v-model="display">
            </div>
            <div class="form-group form-content">
              <label for="email">Email</label>
              <input type="email" id="email" class="form-control" placeholder="Email" v-model="email">
            </div>
            <div class="form-group form-content">
              <label for="password">Password</label>
              <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" >
            </div>
             <div class="dang" v-if="errorMessage">{{errorMessage}}</div>
            <button type="button" class="btn btn-primary mt-4" v-on:click="signup">Sign up</button>
          </form>
        </div>
        <div class="card-footer">
         <div v-show="showSuccess">
            Register success: {{ username }}
            <router-link to="signin">Sign In</router-link>
          </div>
        </div>
      </div>
     </div>
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