class TasksController < ApplicationController
  include TokenAuthenticatable

  def index
    @tasks = @current_user.tasks
    render json: @tasks
  end

  def show
  end


  def edit
  end

  def create

    @task = @current_user.tasks.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end

  end
  
  def update

  end

  def destroy
  end

  private 

  def task_params
    params.require(:task).permit(:name,:description)
  end
end
