Rails.application.routes.draw do
    resources :user_sessions

    match 'login' => "user_sessions#new", :via => [:get], :as => :login
    match 'logout' => "user_sessions#destroy", :via => [:get], :as => :logout

    resources :users
    resources :user, :as => 'account'

    match 'signup' => 'users#new', :via => [:get], :as => :signup

    root :to => 'users#new'
end
