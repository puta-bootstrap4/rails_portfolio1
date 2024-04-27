class TasksController < ApplicationController
  include TokenAuthenticatable
  
  def index
    @tasks = @current_user.tasks
    render json: @tasks
  end

  def show
  end

  def new
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
