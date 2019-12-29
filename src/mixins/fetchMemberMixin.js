import BnkAPI from "../api/bnk.api";

export const fetchMemberMixin = {
  created() {
    this.fetchUser();
  },
  data() {
    return {
      profile: {
        _id: "",
        name: "",
        imgUrl: "",
        instagramId: ""
      }
    }
  },
  methods: {
    fetchUser() {
      BnkAPI.getMember(this.$route.params.id).then(
        response => {
          this.profile = response.data;
        },
        err => {
          console.log(err.response.data);
        }
      );
    },
  }
}