require 'spec_helper'
require 'rails_helper'

describe User do
  before(:each) do
    @user = create_user
  end

  it "uses email as display name if name is not set" do
      @user.name = nil
      expect(@user.display_name).to eq(@user.email)
  end

  it "uses name as display name if name is set" do
    expect(@user.display_name).to eq(@user.name)
  end

  it "creates an authentication token only if token is not nil" do
    @user.token = nil
    @user.ensure_authentication_token!
    expect(@user.token).not_to be_nil
  end
end

def create_user
  FactoryGirl.create(:user)
end

def create_users(num)
  FactoryGirl.create_list(:user, num)
end