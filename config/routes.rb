Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/victims" => "victims#index"
  post "/victims" => "victims#create"
  get "/victims/:id" => "victims#show"
end
