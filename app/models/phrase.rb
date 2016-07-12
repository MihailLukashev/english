class Phrase < ActiveRecord::Base
  has_many :examples
  belongs_to :user
  has_many :likes, as: :likeable
  # has_many :upliked_users, through: likes, source: :user
  accepts_nested_attributes_for :examples, reject_if: lambda {|attributes| attributes['body'].blank?}
before_save :default_value


  def default_value
    self.category ||= 'common'
  end


  def as_json(options = {})
    super(options.merge(include: [:user, :likes, examples: {include: [:user, :likes]}]))
  end

end
