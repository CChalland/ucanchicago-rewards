/* global Vue, VueRouter, axios */

var RewardsPage = {
  template: "#rewards-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      let params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/")
        })
        .catch(function(error) {
          this.errors = error.response.data.errors;
        }.bind(this));
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: RewardsPage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});