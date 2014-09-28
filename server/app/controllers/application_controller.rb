class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  def configure_permitted_parameters
  	devise_parameter_sanitizer.for(:sign_up) do |u|
  		u.permit(
  			:email,
  			:name,
  			:password,
  			:password_confirmation
  			)
	  	end

  	devise_parameter_sanitizer.for(:account_update) do |u|
  		u.permit(
  			:current_password,
  			:email,
  			:name,
  			:password,
  			:password_confirmation,
        :city,
        :state, 
        :handicap, 
        :days_of_week_preference, 
        :time_of_day_preference, 
        :cart_or_walk,
        :speed,
        :mindset
  			)
  		end
  end  		
end
