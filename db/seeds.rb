User.destroy_all
Victim.destroy_all


User.create!([
  {name: "admin", email: "admin@ucanchicago.co", password: "Evolve@1871", password_confirmation: "Evolve@1871"}
])