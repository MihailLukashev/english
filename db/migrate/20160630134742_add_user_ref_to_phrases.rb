class AddUserRefToPhrases < ActiveRecord::Migration
  def change
    add_reference :phrases, :user, index: true, foreign_key: true
  end
end
