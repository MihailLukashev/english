class AddActivityToUsers < ActiveRecord::Migration
  def change
    add_column :users, :activity, :integer, default: 0
  end
end
