<template>
  <div>
    <div>
      <h1>{{ profile.name }}</h1>
      <img :src="profile.imgUrl" :alt="profile.name">
      <h3>IG: {{profile.instagramId}}</h3>
    </div>
  </div>
</template>

<script>
import BnkService from "../api/bnk.api";
export default {
  created() {
    this.fetchUser();
  },
  mounted() {},
  data() {
    return {
      profile: {
        _id: "",
        name: "",
        imgUrl: "",
        instagramId: ""
      }
    };
  },
  methods: {
    fetchUser() {
      BnkService.getMember(this.$route.params.id).then(
        response => {
          this.profile = response.data;
        },
        err => {
          console.log(err.response.data);
        }
      );
    }
  }
};
</script>

<style scoped>
img {
  width: 200px;
  height: auto;
}
</style>