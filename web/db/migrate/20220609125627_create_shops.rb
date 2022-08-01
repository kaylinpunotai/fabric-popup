class CreateShops < ActiveRecord::Migration[7.0]
  def self.up
    # # sqlite3
    # create_table :shops  do |t|
    #   t.string :shopify_domain, null: false
    #   t.string :shopify_token, null: false
    #   t.timestamps
    # end

    # postgres
    create_table :shops  do |t|
      t.text :shopify_domain, null: false
      t.text :shopify_token, null: false
      t.timestamps
    end

    add_index :shops, :shopify_domain, unique: true
  end

  def self.down
    drop_table :shops
  end
end
