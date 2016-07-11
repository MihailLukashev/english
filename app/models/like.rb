class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :likeable, polymorphic: true
  # validates_uniqueness_of :likeable_id, scope: :user_id
  # validates_uniqueness_of :example_id, scope: user_id
end
