module GolfWithMe
  class Protected < Grape::API
    format :json
    http_basic do |username, password|
      username == 'username' && password == 'password'
    end
    resource :protected do
      desc 'Returns success if username=username and password=password.'
      get :ping do
        { success: 'true' }
      end
    end
  end
end
