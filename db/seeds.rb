User.destroy_all

User.create!([
  {name: "admin", email: "admin@ucanchicago.co", password: "password"}
])