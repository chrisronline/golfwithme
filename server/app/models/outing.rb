class Outing < ActiveRecord::Base
	belongs_to :creator, class_name: "User"
	has_many :players, class_name: "User", :through => :player_outing
	has_many :player_outings
end
