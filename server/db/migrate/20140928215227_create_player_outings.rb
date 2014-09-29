class CreatePlayerOutings < ActiveRecord::Migration
  def change
    create_table :player_outings do |t|
      t.integer :user_id
      t.integer :outing_id

      t.timestamps
    end
  end
end
