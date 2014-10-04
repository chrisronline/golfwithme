class Api::OutingsController < Api::BaseController
  def index
    render json: { :outings => Outing.all }
  end

  def create
  	if @user.present?
		outing = Outing.new(outing_params)
	    outing.creator = @user
	    player_outing = outing.player_outings.new
	    player_outing.user = @user
	    player_outing.outing = outing

	    if outing.save
			render json: { :outing => outing } , status: :created 
	    else
	        render json: { :errors => outing.errors} , status: :unprocessable_entity 
	    end
	else
		render json: { :error => "you must be authenticated"}, status: :unauthorized
	end
  end

  private 
  def outing_params
  	  json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
      json_params.require(:outing).permit(:start_time, :course, :title, :description, :wanted_num_players)
    end
end