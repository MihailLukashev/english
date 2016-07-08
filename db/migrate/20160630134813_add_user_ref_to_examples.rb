class AddUserRefToExamples < ActiveRecord::Migration
  def change
    add_reference :examples, :user, index: true, foreign_key: true
  end
end
