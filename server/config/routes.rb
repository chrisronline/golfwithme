Rails.application.routes.draw do
  resources :outings

  devise_for :users, controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}

  resources :users

  post 'outings/join/:id', to: 'outings#join'

  get 'pages/index'

  root 'pages#index'
end
