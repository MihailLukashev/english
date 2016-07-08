class CreatePhrases < ActiveRecord::Migration
  def change
    create_table :phrases do |t|
      t.string :phrase
      t.string :translate
      t.integer :upvotes
      t.integer :downvotes

      t.timestamps null: false
    end
  end
end
