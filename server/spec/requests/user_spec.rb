require 'spec_helper'
require 'rails_helper'

describe "api/user" do
  before(:each) do
  	@user = create_user
  end

  describe "index" do
    it "shows all users" do
      create_users 9
      get '/api/users'

      expect(response).to be_success
      expect(json['users'].length).to eq(10) # 10 because of the before_each user
    end	
  end

  describe "show" do
    it "shows user display name if not logged in" do
  	  get "/api/users/#{@user.id}.json"

  	  expect(response).to be_success
  	  expect(json['user']['display_name']).not_to be_empty
  	  expect(json['user']['handicap']).to be_nil
    end

    it "shows full user information if logged in" do
  	  login_user = create_user

  	  get add_auth_params("/api/users/#{@user.id}.json", login_user)

	    expect(response).to be_success
  	  expect(json['user']['id']).to eq(@user.id)
  	  expect(json['user']['handicap']).to eq("#{@user.handicap}")
    end  
  end

  describe "destroy" do
    it "doesn't allow different authenticated user to delete" do
		  login_user = create_user
		  add_auth_params("/api/users/#{@user.id}.json", login_user)
		  delete add_auth_params("/api/users/#{@user.id}.json", login_user)
		  expect(response.status).to eq(401)
    end
  
    it "fails with no authentication" do
		  delete "/api/users/#{@user.id}.json"
		  expect(response.status).to eq(401)
    end

    it "allows own user to delete their account" do
		  delete add_auth_params("/api/users/#{@user.id}.json", @user)
		  expect(response).to be_success
    end
  end

  describe "update" do
  	it "returns unauthorized trying to edit another user's credentials" do
  		login_user = create_user
  		post_json = { :user => { :email => "testemail@email.com", :password => "password", :handicap => "20"}}
  		patch add_auth_params("/api/users/#{@user.id}.json", login_user), post_json
  		expect(response.status).to eq(401)
    end

    it "allows correct user to edit their own credentials" do
  		post_json = { :user => { :handicap => "20"}}.to_json
  		patch add_auth_params("/api/users/#{@user.id}.json", @user), post_json
  		@user.reload
  		expect(@user.handicap).to eq("20")
    end

    it "returns unauthorized with unknown user" do
    	post_json = { :user => { :email => "testemail@email.com", :password => "password", :handicap => "20"}}
    	patch "/api/users/#{@user.id}.json"
    	expect(response.status).to eq(401)
    end
  end
end

def create_user
  FactoryGirl.create(:user)
end

def create_users(num)
  FactoryGirl.create_list(:user, num)
end

def add_auth_params(path, user)
   "#{path}?email=#{user.email}&token=#{user.token}"
end