class Api::OutingsController < ApiResourceController::Base
	before_filter :authenticate_user!
	before_filter :ensure_params_exist, :except => [:destroy]
	protect_from_forgery with: :null_session
	respond_to :json

  # GET /outings
  # GET /outings.json
  def index
    @outings = Outing.all
  end
end