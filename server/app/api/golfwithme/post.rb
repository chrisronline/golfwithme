module GolfWithMe
  class Post < Grape::API
    format :json
    desc 'Post some json data'
    resource :spline do
      post do
        { reticulated: params[:reticulated] }
      end
    end
  end
end
