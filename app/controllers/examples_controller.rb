class ExamplesController < ApplicationController
before_filter :authenticate_user!, only: [:create, :upvotes, :downvotes]

  def create
    phrase = Phrase.find(params[:phrase_id])
    example = phrase.examples.create(example_params.merge(user_id: current_user.id))
    respond_with phrase, example
  end

  def uplikes
    phrase = Phrase.find(params[:phrase_id])
    example = phrase.examples.find(params[:id])
    example.increment!(:upvotes)
    example.likes.create
    respond_with phrase, example
  end

  def downlikes
    phrase = Phrase.find(params[:phrase_id])
    example = phrase.examples.find(params[:id])
    example.decrement!(:upvotes)
example.likes.create
    respond_with phrase, example
  end

  private
  def example_params
    params.require(:example).permit(:body)
  end

end
