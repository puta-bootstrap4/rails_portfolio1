Rails.application.routes.draw do
  get 'tasks/index', to: 'tasks#index'
  get 'tasks/show'
  get 'tasks/new'
  get 'tasks/edit'
  get 'tasks/update'
  get 'tasks/destroy'
    resources :users, only: %i[update]
    post 'signup', to: 'authentication#signup'
    post 'login', to: 'authentication#login'
end
