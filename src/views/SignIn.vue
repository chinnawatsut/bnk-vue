<template>
  <div>
    login
    <div>
      <label for="user">Username:</label>
      <input type="text" id="user" v-model="message" placeholder="" />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="message" placeholder="" />
      <button v-on:click="login"> login </button>
    </div>
  </div>
</template>

<script>
export default {
  // name: "signin",
  data() {
    return {
      message: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.log('login')
    }
  }
};
</script>

<style scoped>

</style>