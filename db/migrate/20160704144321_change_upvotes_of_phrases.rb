class ChangeUpvotesOfPhrases < ActiveRecord::Migration
  def change
    change_column :phrases, :upvotes, :integer, default: 0
  end
end
