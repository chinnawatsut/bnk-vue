<template>
  <div class="row p-0">
    <div class="card text-center mt-5 col-md-5 p-0">
    <div class="card-header">
      Profile
    </div>
    <div class="card-body">
      <h5 class="card-title"> Name: {{ profile.display }}</h5>
      <span v-show="errorMessage">{{ errorMessage }}</span> 
    </div>
    <div class="card-footer text-muted">
    </div>
  </div>
  </div>
</template>

<script>
import UserService from '../api/user.api'

export default {
  data() {
    return {
      profile: {
        display: ""
      },
      errorMessage: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      UserService.GetProfile()
        .then(response => {
          this.profile = response.data;
        })
        .catch(e => {
          this.errorMessage = e.response.data;
        });
    }
  }
};
</script>

<style>
.card {
  margin: auto;
}
</style>