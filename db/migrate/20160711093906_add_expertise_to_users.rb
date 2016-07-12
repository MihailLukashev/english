class AddExpertiseToUsers < ActiveRecord::Migration
  def change
    add_column :users, :expertise, :integer, default: 0
  end
end
