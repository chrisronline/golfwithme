class Outing < ActiveRecord::Base
	belongs_to :creator, class_name: "User"
	has_many :players, class_name: "User", :through => :player_outing
	has_many :player_outings

	validates :wanted_num_players, presence: true, numericality: { only_integer: true, :greater_than =>	 0 }
	validates :title, presence: true
	validates :start_time, presence: true
	validates :course, presence: true
end
