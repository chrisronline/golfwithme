Rails.application.routes.draw do
  resources :outings

  devise_for :users, controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}

  resources :users

  post 'outings/join/:id', to: 'outings#join'
  post 'outings/unjoin/:id', to: 'outings#unjoin'

  get 'pages/index'

  root 'pages#index'
end
