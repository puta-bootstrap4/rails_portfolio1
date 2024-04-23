class UsersController < ApplicationController
    
    include TokenAuthenticatable

    def update
     if @current_user.update(user_params)
       render json: {user: {name: @current_user.name}}
     else 
       render json: {errors: {body: @current_user.errors}}, status: :unprocessable_entity
     end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password)
    end

end