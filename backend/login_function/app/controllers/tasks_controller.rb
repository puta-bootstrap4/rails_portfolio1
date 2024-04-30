class TasksController < ApplicationController
  include TokenAuthenticatable

  def index
    @tasks = @current_user.tasks
    render json: @tasks.as_json(only: [:id,:name])
  end


  def show
    task = Task.find(params[:id])
    render json: task
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Task not found" }, status: :not_found
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
  def current_user_exist
    if @current_user == nil

    else
    end
  end
  def task_params_show
    params.require
  end

  def task_params
    params.require(:task).permit(:name,:description,:id)
  end
end
