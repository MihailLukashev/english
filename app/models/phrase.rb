class Phrase < ActiveRecord::Base
  has_many :examples
  belongs_to :user
  has_many :likes, as: :likeable
  accepts_nested_attributes_for :examples, reject_if: lambda {|attributes| attributes['body'].blank?}



  def as_json(options = {})
    super(options.merge(include: [:user, examples: {include: :user}]))
  end

end
