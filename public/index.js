var LoginPage = {
  template: "#sample-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  mounted: function() {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/users", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  },
  methods: {},
  computed: {}
};

var ShowUsers = {
  template: "#order-show-page",
  data: function() {
    return {
      users: {
        name: "",
        email: "",
        password: "",
        date: ""
      }
    };
  },
  mounted: function() {
    axios.get("/users").then(
      function(response) {
        this.users = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: LoginPage },
    { path: "/pwned", component: ShowUsers}
  ]
});

var app = new Vue({
  el: "#app",
  router: router,
  mounted: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});