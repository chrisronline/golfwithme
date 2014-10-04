class Api::SessionsController < Devise::SessionsController
	before_filter :configure_permitted_parameters
	protect_from_forgery with: :null_session
	respond_to :json

	def create
		json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
		json_params.require(:user).permit(:email, :name, :password)

		user = User.find_for_database_authentication(:email => json_params[:user][:email])

		return invalid_login_attempt unless user

		if user.valid_password?(json_params[:user][:password])
			sign_in(:user, user)
			user.ensure_authentication_token!
			render :json => {:auth_token => user.token, :email => user.email}, :status => :ok
		else
			invalid_login_attempt
		end
	end

	protected
	def ensure_params_exist
		return unless params[:user_login].blank?
		render :json => {:message => "Error with your email or password"}, :status => 401
	end

	def invalid_login_attempt
		render :json => {:message => "Error with your email or password"}, :status => 401
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