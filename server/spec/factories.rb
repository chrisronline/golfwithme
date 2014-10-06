require 'faker'

FactoryGirl.define do 
	factory :user do |user|
		sequence(:email){|n| "email#{n}@email.com"}
		user.password("password")
		user.handicap("10")
		user.token("token")
		user.name { Faker::Name.name }
	end
end