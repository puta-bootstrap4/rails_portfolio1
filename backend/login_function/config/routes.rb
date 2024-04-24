Rails.application.routes.draw do
    resources :users, only: %i[update]
    post 'signup', to: 'authentication#signup'
    post 'login', to: 'authentication#login'
end
