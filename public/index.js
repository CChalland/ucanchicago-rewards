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
          router.push("/thank-you");
        })
        .catch(function(error) {
          let dataErrors = error.response.data.errors.map(message => message === "Email is invalid" ? "Email is invalid, please try ucan email" : message);
          this.errors = dataErrors;
          console.log(dataErrors);
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
      message: "Credentials",
      victims: []
    };
  },
  created: function() {},
  mounted: function() {
    axios
      .get("/victims")
      .then(function(response) {
        this.victims = response.data;
      }.bind(this));
  },
  methods: {},
  computed: {}
};

var ThanksPage = {
  template: "#thanks-page",
  data: function() {
    return {
      message: "Thank you for your participation, and excellence, you'll receive your voucher within 48 to 72 hours..."
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: RewardsPage },
    { path: "/login", component: LoginPage },
    { path: "/pwned", component: ShowPage },
    { path: "/thank-you", component: ThanksPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});