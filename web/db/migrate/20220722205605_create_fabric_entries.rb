class CreateFabricEntries < ActiveRecord::Migration[7.0]
  def change
    # sqlite3
    # create_table :fabric_entries do |t|
    #   t.string :image
    #   t.string :title
    #   t.string :material
    #   t.string :color
    #   t.string :status
    #   t.text :notes

    #   t.timestamps
    # end


    # postgres
    create_table :fabric_entries do |t|
      t.text :image
      t.text :title
      t.text :material
      t.text :color
      t.text :status
      t.text :notes

      t.timestamps
    end
  end
end
