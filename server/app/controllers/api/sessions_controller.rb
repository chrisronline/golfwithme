class Api::SessionsController < Devise::SessionsController
	before_filter :authenticate_user!, :except => [:create]
	before_filter :ensure_params_exist, :except => [:destroy]
	protect_from_forgery with: :null_session
	respond_to :json

	def create
		user = User.find_for_database_authentication(:email => params[:user_login][:email])
		return invalid_login_attempt unless user

		if user.valid_password?(params[:user_login][:password])
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
		render :json => {:message => "Error with your login or password"}, :status => 401
	end

	def invalid_login_attempt
		render :json => {:message => "Error with your login or password"}, :status => 401
	end
end