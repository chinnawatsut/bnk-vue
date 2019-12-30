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
      </div>
    </div>
    <div class="col-md-4 col-md-offset-5 form-content preview-box">
      <h3>Previewer</h3>
      <input type="text" class="form-control" v-model="customEndpoint" />
      <div>
        <span class="mode">Preview computed cahed:</span>
        {{ igUrl }}
      </div>
      <div>
        <span class="mode">Preview method:</span>
        {{ igUrler(profile.instagramId) }}
      </div>
      <div v-bind:class="isValidate ? 'valid' : 'invalid' ">
        <span class="mode">Preview Watch:</span>
        {{ fullUrl }}
      </div>
    </div>
  </div>
</template>
<script>
import BnkAPI from "../api/bnk.api";
import { fetchMemberMixin } from "../mixins/fetchMemberMixin";

export default {
  mixins: [fetchMemberMixin],
  mounted() {},
  data() {
    return {
      errors: [],
      errorMessage: "",
      customEndpoint: "https://www.instagram.com",
      fullUrl: "",
      isValidate: true
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
    },
    igUrler(url) {
      console.log("method igUrler");
      return this.customEndpoint + "/" + url;
    },
    validURL(str) {
      // reference
      // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }
  },
  computed: {
    igUrl: function() {
      console.log("computed igUrl");
      return "https://www.instagram.com/" + this.profile.instagramId;
    }
    // igUrl: {
    //  get: function () { }
    //  set: function (newval) { }
    // },
  },
  watch: {
    customEndpoint: function(val) {
      console.log("watch customEndpoint");
      this.fullUrl = val + "/" + this.profile.instagramId;
      this.isValidate = this.validURL(this.fullUrl);
    }
  }
};
</script>

<style scoped>
.form-content {
  margin: auto;
  text-align: left;
}
.preview-box {
  margin-top: 30px;
}
.mode {
  color: #41b883;
}

.valid {
  color: #5bc236;
}
.invalid {
  color: #fa163f;
}
</style>