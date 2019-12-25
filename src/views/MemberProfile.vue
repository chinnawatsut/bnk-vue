<template>
  <div class="member-content">
    <div class="card">
      <div class="card">
        <h5 class="card-header"><h1>{{ profile.name }}</h1></h5>
        <div class="card-body">
          <img :src="profile.imgUrl" :alt="profile.name" class="card-img-top">
          <h5 class="card-title pt-2">IG: {{profile.instagramId}}</h5>
        </div>
      </div>
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
  width: 100%;
  height: 500px;
  object-fit: cover;
}
.member-content {
  width: 50%;
  margin: auto;
}
h1 {
  color: #4f4f4f;
}
</style>