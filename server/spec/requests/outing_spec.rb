require 'spec_helper'
require 'rails_helper'

describe "api/outing" do
  describe "index" do
    it "lists all outings in the future" do
      outings = create_outings(10)

      outings.each {|o| puts o.start_time}

      puts Time.now

      get "/api/outings.json"

      expect(response).to be_success
      expect(json['outings'].length).to eq(10)
    end	

    it "lists only outings in the future" do
      create_outings(5)

      FactoryGirl.create(:outing, start_time: Faker::Date.backward(23))
	  get "/api/outings.json"

      expect(response).to be_success
      expect(json['outings'].length).to eq(5)

    end
  end
end

def create_outings(num)
	FactoryGirl.create_list(:outing, num)
end

def create_outing
	FactoryGirl.create
end