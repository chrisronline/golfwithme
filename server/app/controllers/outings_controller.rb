class OutingsController < ApplicationController
  before_action :set_outing, only: [:show, :edit, :update, :destroy, :join]
  before_action :authenticate_user!, only: [:new, :edit, :update, :destroy]
  before_action :check_user, only: [:edit, :update, :destroy]

  # GET /outings
  # GET /outings.json
  def index
    @outings = Outing.all
  end

  # GET /outings/1
  # GET /outings/1.json
  def show

  end

  # GET /outings/new
  def new
    @outing = Outing.new
  end

  # GET /outings/1/edit
  def edit
  end

  def join
    player_outing = @outing.player_outings.new
    player_outing.outing = @outing
    player_outing.user = current_user
    respond_to do |format|
      if player_outing.save
        format.html { redirect_to @outing, notice: 'Successfully joined outing.' }
        format.json { render :show, status: :created, location: @outing }
      else
        format.html { redirect_to @outing, notice: 'Failed to join outing.' }
        format.json { render json: @outing.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /outings
  # POST /outings.json
  def create
    @outing = Outing.new(outing_params)
    @outing.creator = current_user
    @player_outing = @outing.player_outings.new
    @player_outing.user = current_user
    @player_outing.outing = @outing

    respond_to do |format|
      if @outing.save
        format.html { redirect_to @outing, notice: 'Outing was successfully created.' }
        format.json { render :show, status: :created, location: @outing }
      else
        format.html { render :new }
        format.json { render json: @outing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /outings/1
  # PATCH/PUT /outings/1.json
  def update
    respond_to do |format|
      if @outing.update(outing_params)
        format.html { redirect_to @outing, notice: 'Outing was successfully updated.' }
        format.json { render :show, status: :ok, location: @outing }
      else
        format.html { render :edit }
        format.json { render json: @outing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /outings/1
  # DELETE /outings/1.json
  def destroy
    @outing.destroy
    respond_to do |format|
      format.html { redirect_to outings_url, notice: 'Outing was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outing
      @outing = Outing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def outing_params
      params.require(:outing).permit(:start_time, :course)
    end

    def check_user
       if current_user != @outing.creator
          redirect_to root_url, alert: "Sorry, you cannot edit this outing"
      end
    end
end
