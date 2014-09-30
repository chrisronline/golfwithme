class AddWantedNumberOfPlayersToOuting < ActiveRecord::Migration
  def change
    add_column :outings, :wanted_num_players, :integer
  end
end
