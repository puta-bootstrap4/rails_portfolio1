
  class TasksController < ApplicationController
    include TokenAuthenticatable
  
    def index
      task = @current_user.tasks
      render json: task.as_json(only: [:id, :name])
    end
  
    def show
      task = Task.find(params[:id])
      render json: task
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Task not found" }, status: :not_found
    end
  
    def create
      task = @current_user.tasks.new(task_params)
      if task.save
        render json: task, status: :created
      else
        render json: task.errors.full_messages, status: :unprocessable_entity
      end
    end
  
    def update
      task = @current_user.tasks.find_by(id: params[:id])
      if task
        if task.update(task_params)
          render json: task, status: :ok
        else
          render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'Task not found' }, status: :not_found
      end
    end
    
  
    def destroy
      task = @current_user.tasks.find_by(id: params[:id])
      if task
        task.destroy
        render json: { message: 'Task successfully deleted' }, status: :ok
      else
        render json: { error: 'Task not found' }, status: :not_found
      end
    end
  
    private 
  
    def task_params
      params.require(:task).permit(:name, :description)
    end
  end
  
 
