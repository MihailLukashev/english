class PhrasesController < ApplicationController
before_filter :authenticate_user!, only: [:create, :uplikes, :downlikes ]

  def index
    respond_to do |format|
      format.json { render :json => Phrase.all }
    end
  end

  def create
    @phrase = Phrase.create(phrase_params.merge(user_id: current_user.id))

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

  def edit
    phrase = Phrase.find(params[:id])
    phrase.update_attributes(phrase_params)
    respond_with phrase
  end

  def uplikes
    @phrase = Phrase.find(params[:id])

  unless @phrase.likes.any?{ |h| h.user_id == current_user.id}
      @phrase.likes.create(user_id: current_user.id)
      @phrase.increment!(:upvotes)
  end
    @likes = @phrase.likes
    respond_with @phrase, @likes
  end

  def downlikes
    @phrase = Phrase.find(params[:id])
    unless @phrase.likes.any?{ |h| h.user_id == current_user.id}
    @phrase.decrement!(:upvotes)
    @phrase.likes.create(user_id: current_user.id)
    end
    respond_with @phrase
  end

  private
  def phrase_params
    permited_params=params.require(:phrase).permit(:phrase, :translate, :category, examples_attributes: [:body] )
    examples_params = permited_params[:examples_attributes]
    examples_params.each { |example|
          example[:user_id]=current_user.id
    }
    permited_params
  end

end