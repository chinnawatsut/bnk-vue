<template>
  <div>
    <div class="pb-4">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row-reverse">
        <button
          id="logoutBtn"
          class="btn btn-outline-warning my-2 my-sm-0"
          type="submit"
          v-on:click="logout"
        >Logout</button>
        <router-link class="pr-3 text-light" to="/profile">Profile</router-link>
      </nav>
    </div>
    <h2>Members</h2>
    <div v-if="errorMessage" class="dang">
      {{ errorMessage }}
    </div>
    <div class="row home">
      <div class="col-sm-4 pb-4" v-for="(member,index) in members" :key="index">
        <div class="card">
          <img :src="member.imgUrl" :alt="member.name" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{member.name}}</h5>
            <p class="card-text">IG: {{member.instagramId}}</p>
            <router-link :to="`/bnk/${member._id}`" class="btn btn-primary">See more...</router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-4 pb-4">
        <div class="card">
          <img
            src="https://lh3.googleusercontent.com/FIMC5WQ5HW4wuvko9w3UE86ICl3rcMPOEOb8C92CbdLPX0bzGXbh0jm9DDeuK-rTJN0"
            alt
          />
          <div class="card-body">
            <router-link :to="`/bnk/create`" class="btn btn-success">New member</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import BnkService from "../api/bnk.api";
import LocalStorageService from '../api/localStorage'

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  created() {
    this.getMember();
  },
  mounted() {},
  data() {
    return {
      members: [],
      errorMessage: ''
    };
  },
  methods: {
    logout() {
      LocalStorageService.removeToken();
      this.$router.push({ path: "/signin" });
    },
    getMember() {
      BnkService.getAllMembers()
        .then(response => {
          this.members = response.data;
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.home {
  margin: auto;
  width: 80%;
}
.dang {
  color: red;
}
</style>