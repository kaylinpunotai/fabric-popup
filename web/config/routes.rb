# frozen_string_literal: true

Rails.application.routes.draw do
  ## Frontend
  root to: "home#index"
  ## Backend
  # root "fabrics#index"

  mount ShopifyApp::Engine, at: "/api"
  get "/api", to: redirect(path: "/") # Needed because our engine root is /api but that breaks FE routing

  ## Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :fabric_entries
  resources :tag_entries
  get "/api/products/count", to: "products#count"
  get "/api/products/create", to: "products#create"
  get "/api/tag_entries/index", to: "tag_entries#index"
  post "/api/tag_entries/sort", to: "tag_entries#sort"
  get "/api/tag_entries/show/:id", to: "tag_entries#show"
  post "/api/tag_entries", to: "tag_entries#create"
  patch "/api/tag_entries/update/:id", to: "tag_entries#update"
  delete "/api/tag_entries/delete/:id", to: "tag_entries#destroy"


  ## Any other routes will just render the react app
  match "*path" => "home#index", via: [:get, :post]
end
