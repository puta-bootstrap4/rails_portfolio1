Rails.application.routes.draw do

    resources :users, only: %i[create update]
    post 'signup', to: 'authentication#signup'
    post 'refresh', to: 'authentication#refresh'
end
