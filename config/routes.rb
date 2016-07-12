Rails.application.routes.draw do
  devise_for :users, path: '/api/users'


  resources :phrases, only: [:create, :index, :show, :update], path: '/api/phrases' do
    resources :examples, only: [:show, :create] do
      member do
        put '/uplike' => 'examples#uplikes'
        put '/downlike' => 'examples#downlikes'
      end
    end
    member do
      put '/uplike' => 'phrases#uplikes'
      put '/downlike' => 'phrases#downlikes'
    end
  end
  match '/api/users/:username/phrases', to: 'phrases#show_users_phrases', via: 'get'
  match '/api/phrases/category/:category', to: 'phrases#show_category', via: 'get'
  # match '/api/phrases/:id/edit', to: 'phrases#edit', via: 'put'

  root to: 'application#angular'
  get '*path' => 'application#angular'

end
