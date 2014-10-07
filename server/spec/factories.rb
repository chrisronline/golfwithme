require 'faker'

FactoryGirl.define do 
	factory :user do 
	  email { Faker::Internet.email }
	  handicap { rand(1..20) }
	  name { Faker::Name.name }
	  password "password"
	  token "token"
	end

	factory :outing do |outing|
      course { "The #{Faker::App.name} Golf Course" }
      wanted_num_players { rand(1..20) }
      title { "The #{Faker::Company.name} #{Faker::Company.suffix} golf tourney" }
      start_time { Faker::Date.between(2.days.from_now, 23.days.from_now) }
	end
end