json.array!(@outings) do |outing|
  json.extract! outing, :id, :start_time, :course
  json.url outing_url(outing, format: :json)
end
