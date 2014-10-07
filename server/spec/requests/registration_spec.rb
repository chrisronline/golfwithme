require 'spec_helper'
require 'rails_helper'

describe "api/user registration" do
  describe "sign_in" do
    it "registers a user" do
      post_json = { :user => { :email => "testemail@email.com", :password => "password"}}
      post '/api/auth.json', post_json
      expect(response).to be_success
    end	

    it "returns a token on sign_up (this might be bad)" do
      post_json = { :user => { :email => "testemail@email.com", :password => "password"}}
      post '/api/auth.json', post_json
      expect(json['token']).not_to be_blank
    end 
  end
end