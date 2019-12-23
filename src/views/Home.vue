<template>
  <div class="home">
    <button v-on:click="logout">Logout</button>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/signin" });
    }
  }
};
</script>
