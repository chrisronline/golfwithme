class AddTitleAndDescriptionToOuting < ActiveRecord::Migration
  def change
    add_column :outings, :title, :string
    add_column :outings, :description, :string
  end
end
