<template>
  <div class="home">
    <button v-on:click="logout">Logout</button>
    <router-link to="/profile">Profile</router-link>
    <div>
      <h2>Members</h2>
      <div v-for="(member,index) in members" :key="index">
        <h2>{{member.name}}</h2>
        <h3>IG: {{member.instagramId}}</h3>
        <img :src="member.imgUrl" :alt="member.name" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import BnkService from "../api/bnk.api";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  created() {
    this.getMember();
  },
  data() {
    return {
      members: []
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/signin" });
    },
    getMember() {
      BnkService.getAllMembers()
        .then(response => {
          this.members = response.data;
        })
        .catch(e => {
          this.errorMessage = e.response.data;
        });
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
}
</style>