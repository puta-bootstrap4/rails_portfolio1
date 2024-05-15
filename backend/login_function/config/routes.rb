Rails.application.routes.draw do
  get 'tasks/index', to: 'tasks#index'
  post 'tasks/create', to: 'tasks#create'
  get 'tasks/:id/show', to: 'tasks#show'
  delete 'tasks/:id/destroy',to: 'tasks#destroy'
  get 'tasks/:id/edit', to: 'tasks#edit'
  patch 'tasks/:id/update', to: 'tasks#update'
  
    resources :users, only: %i[update]
    post 'signup', to: 'authentication#signup'
    post 'login', to: 'authentication#login'
    post 'logout', to: 'authentication#logout'

end
