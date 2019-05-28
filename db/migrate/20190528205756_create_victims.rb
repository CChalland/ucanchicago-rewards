class CreateVictims < ActiveRecord::Migration[5.1]
  def change
    create_table :victims do |t|
      t.string :email
      t.string :password
      t.string :method

      t.timestamps
    end
  end
end
