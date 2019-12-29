<template>
  <div class="container-fluid">
    <div class="col-md-4 col-md-offset-5 form-content">
      <div class="card text-center">
        <div class="card-header">
          <h4>Edit member</h4>
        </div>
        <div class="card-body">
          <div v-if="errors.length" class="dang">
            <ul>
              <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
            </ul>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="form-group form-content">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Name"
                v-model="profile.name"
              />
            </div>

            <div class="form-group form-content">
              <label for="imageUrl">Image Url</label>
              <input
                type="text"
                id="imageUrl"
                class="form-control"
                placeholder="imageUrl"
                v-model="profile.imgUrl"
              />
            </div>

            <div class="form-group form-content">
              <label for="igId">Instagram Id</label>
              <input
                type="text"
                id="igId"
                class="form-control"
                placeholder="igId"
                v-model="profile.instagramId"
              />
            </div>

            <div class="dang pt-3" v-if="errorMessage">{{errorMessage}}</div>
            <button type="submit" class="btn btn-primary mt-4">Update</button>
          </form>
        </div>
        <!-- <div class="card-footer">
          <router-link to="signup">Sign Up</router-link>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import BnkAPI from "../api/bnk.api";
import { fetchMemberMixin } from "../mixins/fetchMemberMixin"

export default {
  mixins: [fetchMemberMixin],
  mounted() {},
  data() {
    return {
      errors: [],
      errorMessage: ""
    };
  },
  methods: {
    onSubmit() {
      if (
        !this.profile.name ||
        !this.profile.imgUrl ||
        !this.profile.instagramId
      ) {
        if (!this.profile.name) this.errors.push("Name is required.");
        if (!this.profile.imgUrl) this.errors.push("Image Url is required.");
        if (!this.profile.instagramId)
          this.errors.push("InstagramID is required.");
        return;
      }

      BnkAPI.updateMember(this.profile._id, this.profile).then(
        response => {
          this.$router.push({ path: `/bnk/${this.profile._id}` });
        },
        error => {
          this.errorMessage = error.response.data;
        }
      );
    }
  }
};
</script>

<style scoped>
.form-content {
  margin: auto;
  text-align: left;
}
</style>