class CreateExamples < ActiveRecord::Migration
  def change
    create_table :examples do |t|
      t.string :body
      t.integer :upvotes
      t.integer :downvotes
      t.references :phrase, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
