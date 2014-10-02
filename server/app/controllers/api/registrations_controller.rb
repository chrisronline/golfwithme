class Api::RegistrationsController < Devise::RegistrationsController	
	before_filter :configure_permitted_parameters
	
	def create 		
		build_resource

		resource.email = params[:user][:email]
		resource.password = params[:user][:password]
		
		if resource.save
			resource.ensure_authentication_token!
			render json: {:user => resource.email, :authentication_token => resource.token }
		else
			render json: {:errors => resource.errors, :params => params[:user]}
		end
	end

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