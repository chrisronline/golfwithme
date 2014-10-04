class Api::BaseController < ActionController::Base
	before_filter :authenticate_user_from_token

	private

	def authenticate_user_from_token
		user_email = params[:user_email].presence
		@user = user_email && User.find_by_email(user_email)

		if @user && Devise.secure_compare(@user.token, params[:user_token])
			sign_in @user, store: false
		end
	end
end
