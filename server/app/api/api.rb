class API < Grape::API
  prefix 'api'
  mount GolfWithMe::Ping
  mount GolfWithMe::Raise
  mount GolfWithMe::Protected
  mount GolfWithMe::Post
end
