class AddCreatorIdToOuting < ActiveRecord::Migration
  def change
    add_column :outings, :creator_id, :integer
  end
end
