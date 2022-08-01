class CreateTagEntries < ActiveRecord::Migration[7.0]
  def change
    # # sqlite3
    # create_table :tag_entries do |t|
    #   t.string :name
    #   t.string :category
    #   t.integer :assignments
    #   t.text :notes

    #   t.timestamps
    # end

    # postgres
    create_table :tag_entries do |t|
      t.text :name
      t.text :category
      t.integer :assignments
      t.text :notes

      t.timestamps
    end
  end
end
