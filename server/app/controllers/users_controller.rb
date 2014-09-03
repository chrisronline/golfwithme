class UsersController < ApplicationController
    before_filter :require_user, :only => [:show, :edit, :update]
    respond_to :json

    def new 
        @user = User.new
        render json: ({ :message => "GolfWithMe API v0.1" })
    end

    def create 
        logger.info "create"
        @user = User.new(params[:user])
        logger.debug @user.email
        if @user.save
            logger.info "account created!"
            render json: { 
                :message => "created user", :user => @user
            }
        else
            logger.info "acouunt not created!"
            render json: { 
                :message => "failed to create user", :user => @user
            }
        end


#        @user = User.new(params[:user])
        #
#        if @user.save
#            logger.info "Your account has been created."
#            flash[:notice] = "Your account has been created."
#            redirect_to signup_url
#        else
#            logger.info "Your account has been created."
#            flash[:notice] = "There was a problem"
#            render :action => :show
#        end
    end


    def show 
        @user = current_user
    end

    def edit 
        @user = current_user
    end

    def update 
        @user = current_user
        if @user.update_attributes(params[:user])
            flash[:notice] = "Account updated!"
            redirect_to account_url
        else
            render :action => :edit
        end
    end
    
    private 
      def user_params
          params.require(:person).permit(:email)
      end
end
