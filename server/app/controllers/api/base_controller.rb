class Api::BaseController < ActionController::Base
  before_filter :read_token_authentication

  private

  def read_token_authentication
    return if params[:email].blank? or params[:token].blank?
    user = User.find_for_database_authentication(:email => params[:email]) 
    return if !user.present? || user.token != params[:token]
    @token_auth_user = user
  end

  def require_token_authentication
  	if @token_auth_user.nil?
    	render json: {
  		  success: false,
  		  message: "Invalid authentication credentials",
  	  }, status: 401
    end 
  end
end
