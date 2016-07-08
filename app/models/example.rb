class Example < ActiveRecord::Base
  belongs_to :phrase
  belongs_to :user
  has_many :likes, as: :likeable


  def as_json(options = {})
    super(options.merge(include: :user))
  end

end
