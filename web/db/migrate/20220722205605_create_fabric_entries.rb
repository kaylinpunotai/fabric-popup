class CreateFabricEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :fabric_entries do |t|
      t.string :image
      t.string :title
      t.string :material
      t.string :color
      t.string :status
      t.text :notes

      t.timestamps
    end
  end
end
