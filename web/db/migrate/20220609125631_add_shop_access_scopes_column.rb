class AddShopAccessScopesColumn < ActiveRecord::Migration[7.0]
  def change

    # # sqlite3
    # add_column :shops, :access_scopes, :string

    # postgres
    add_column :shops, :access_scopes, :text
  end
end
