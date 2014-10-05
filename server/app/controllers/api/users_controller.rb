class Api::UsersController < Api::BaseController
  before_filter :set_user, :only => [:show, :update, :destroy]
  before_filter :require_token_authentication, :only => [:update, :destroy]
  before_filter :allow_change_user, :only => [:update, :destroy]

  def index
    @users = User.all
  end

  def show
  end

  def update
    @user.update(user_params)
    if @user.save
      render :json => {
        :message => "ok"
      }
    else
    render :json => {
        :errors => @user.errors
      }, :status => 422
    end
  end

  def destroy
    @user.destroy
    render :json => { }, :status => 200
  end

  private 

  def set_user
    @user = User.find(params[:id])
  end

  def allow_change_user
    if @token_auth_user != @user
      render json: {
        success: false,
        message: "Invalid authentication credentials",
      }, status: :unauthorized
    end
  end

  def user_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.require(:user).permit(:email, :name, :password, :handicap)
  end
end