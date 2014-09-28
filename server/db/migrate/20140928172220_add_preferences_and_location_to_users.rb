class AddPreferencesAndLocationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :country, :string
    add_column :users, :handicap, :string
    add_column :users, :days_of_week_preference, :string
    add_column :users, :time_of_day_preference, :string
    add_column :users, :cart_or_walk, :boolean
    add_column :users, :speed, :string
    add_column :users, :mindset, :string
  end
end
