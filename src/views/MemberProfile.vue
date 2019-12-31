<template>
  <div class="member-content">
    <div class="card">
      <h5 class="card-header">
        <h1>{{ profile.name }}</h1>
      </h5>
      <div class="card-body">
        <sloth :alt="profile.name" v-on:like="addLike" :likeCount="counter">
        <img :src="profile.imgUrl" :alt="profile.name" class="card-img-top" />
        </sloth>
        <h5 class="card-title pt-4">
          IG: 
          <a :href="profile.instagramId | iglink" target="_blank">
          {{profile.instagramId}}
          </a>
          </h5>
      </div>
      <router-link :to="`/bnk/${profile._id}/edit`" class="btn btn-primary">Edit</router-link>
      <button class="btn btn-danger" v-on:click="remove">Remove</button>
    </div>
  </div>
</template>

<script>
import BnkAPI from "../api/bnk.api";
import { fetchMemberMixin } from "../mixins/fetchMemberMixin"
import globalComponents from "@/components/globalComponents.js"

export default {
  mixins: [fetchMemberMixin],
  mounted() {},
  data() {
    return {
      counter: 0,
    };
  },
  components: {
    ...globalComponents
  },
  methods: {
    remove() {
      BnkAPI.removeMember(this.$route.params.id).then(
        response => {
          this.$router.push({ path: `/` });
        },
        err => {
          console.log(err.response.data);
        }
      );
    },
    addLike() {
      this.counter++
    }
  }
};
</script>

<style scoped>
img {
  width: auto;
  height: 400px;
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