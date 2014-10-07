class Api::RegistrationsController < Devise::RegistrationsController	
	before_filter :configure_permitted_parameters
	protect_from_forgery with: :null_session
	respond_to :json
	
	def create 		
		build_resource(params.require(:user).permit(:email, :name, :password, :handicap))
        
		resource.ensure_authentication_token!

		if resource.save
			render json: { :token => resource.token }
		else
			render json: {:errors => resource.errors }, status: 422
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