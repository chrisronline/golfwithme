Rails.application.routes.draw do
  #resources :outings

  
  #devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  namespace :api, :defaults => {:format => 'json'} do
    devise_for :users, controllers: { registration: 'registrations'}, :path => 'auth', :defaults => {:format => 'json'}
  	resources :outings
  end

  #resources :users

  #post 'outings/join/:id', to: 'outings#join'
  #post 'outings/unjoin/:id', to: 'outings#unjoin'

  #get 'pages/index'

  #root 'pages#index'
end
