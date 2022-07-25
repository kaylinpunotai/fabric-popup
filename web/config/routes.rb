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


  get "/api/fabric_entries/index", to: "fabric_entries#index"
  post "/api/fabric_entries/sort", to: "fabric_entries#sort"
  post "/api/fabric_entries/filter", to: "fabric_entries#filter"
  get "/api/fabric_entries/show/:id", to: "fabric_entries#show"
  post "/api/fabric_entries", to: "fabric_entries#create"
  patch "/api/fabric_entries/update/:id", to: "fabric_entries#update"
  delete "/api/fabric_entries/delete/:id", to: "fabric_entries#destroy"


  get "/api/tag_entries/index", to: "tag_entries#index"
  post "/api/tag_entries/sort", to: "tag_entries#sort"
  post "/api/tag_entries/filter", to: "tag_entries#filter"
  get "/api/tag_entries/show/:id", to: "tag_entries#show"
  post "/api/tag_entries", to: "tag_entries#create"
  patch "/api/tag_entries/update/:id", to: "tag_entries#update"
  delete "/api/tag_entries/delete/:id", to: "tag_entries#destroy"
  post "/api/tag_entries/distinct", to: "tag_entries#distinct"


  ## Any other routes will just render the react app
  match "*path" => "home#index", via: [:get, :post]
end
