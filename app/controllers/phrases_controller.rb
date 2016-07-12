class PhrasesController < ApplicationController
before_filter :authenticate_user!, only: [:create, :uplikes, :downlikes, :edit]
# before_filter :current_user!, only: [:edit]

  def index
    respond_to do |format|
      format.json { render :json => Phrase.all }
    end
  end

  def create
    @phrase = Phrase.create(phrase_params.merge(user_id: current_user.id))
    current_user.activity += 10
    current_user.save
    respond_with @phrase
  end

  def show
    respond_with Phrase.find(params[:id])

  end

  def show_users_phrases
    user = User.find_by username: params[:username]
    phrases = user.phrases
    respond_with phrases
  end

  def show_category
     phrases = Phrase.where(category: params[:category])

     respond_with phrases
  end

  def update
    phrase = Phrase.find(params[:id])
    phrase.update_attributes(phrase_params)
    respond_with phrase
  end

  def uplikes
    @phrase = Phrase.find(params[:id])
  if @phrase.user_id != current_user.id
    unless @phrase.likes.any?{ |h| h.user_id == current_user.id}
        @phrase.likes.create(user_id: current_user.id, count: 1)
        @phrase.increment!(:upvotes)
        current_user.activity += 1
        current_user.save
        user = @phrase.user
        user.expertise += 3
        user.save
    end

  end
    respond_to do |format|
      format.json { render(json: @phrase, status: 200) }
    end
  end

  def downlikes
    @phrase = Phrase.find(params[:id])
    if @phrase.user_id != current_user.id
      unless @phrase.likes.any?{ |h| h.user_id == current_user.id}
        @phrase.decrement!(:upvotes)
        @phrase.likes.create(user_id: current_user.id, count: -1)
        current_user.activity += 1
        current_user.save
        user = @phrase.user
        user.expertise -= 3
        user.save
      end
    end
    respond_to do |format|
      format.json { render(json: @phrase, status: 200) }
    end
  end

  private
  def phrase_params
    permited_params=params.require(:phrase).permit(:phrase, :translate, :category, examples_attributes: [:body] )
    examples_params = permited_params[:examples_attributes]
    if examples_params
      examples_params.each { |example|
            example[:user_id]=current_user.id
      }
    end
    permited_params

  end

end
