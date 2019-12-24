<template>
  <div>
    <h1>Profile</h1>
    Name: {{ profile.display }}
    <span v-show="errorMessage">{{ errorMessage }}</span>
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
</style>