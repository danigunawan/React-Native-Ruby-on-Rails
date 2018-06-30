module Api::V1
  
  class UsersController < ApplicationController
    
    def index
      @users = User.all
      render json: @users
    end

    def show
      @user = User.find(params[:id])
      if @user.valid?
        render json: @user
      else 
        render json: @user.errors
      end
    end

    
    def create
      @user = User.new(user_params)
        if @user.valid?
           @user.save
           render json: @user
        else 
          render json: @user.errors
        end     
    end
      
    def update
      @user = User.update_attributes(params[:username, :password, :password_confirmation])
    end

    def destroy  
      @user = User.destroy(params[:id])
        if @user.valid?
          render json: @user
        else 
          render json: User.all
        end
    end

    private 

    def user_params
      params.require(:user).permit(:username, :password, :password_confirmation)
    end

  end
end