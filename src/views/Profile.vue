<template>
  <div>
    <h1>Profile</h1>
    Name: {{ profile.display }}
    <span v-show="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
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
      let token = localStorage.getItem("token");
      this.axios
        .get("http://localhost:3000/me", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          this.profile = response.data;
        })
        .catch(e => {
          console.log(e);
          this.errorMessage = e.response.data;
        });
    }
  }
};
</script>

<style>
</style>