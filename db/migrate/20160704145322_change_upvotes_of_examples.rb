class ChangeUpvotesOfExamples < ActiveRecord::Migration
  def change
    change_column :examples, :upvotes, :integer, default: 0
  end
end
