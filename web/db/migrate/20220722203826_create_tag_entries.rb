class CreateTagEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :tag_entries do |t|
      t.string :name
      t.string :category
      t.integer :assignments
      t.text :notes

      t.timestamps
    end
  end
end
