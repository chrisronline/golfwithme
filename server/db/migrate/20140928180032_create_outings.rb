class CreateOutings < ActiveRecord::Migration
  def change
    create_table :outings do |t|
      t.datetime :start_time
      t.string :course

      t.timestamps
    end
  end
end
