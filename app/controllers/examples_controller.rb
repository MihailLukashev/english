class ExamplesController < ApplicationController
before_filter :authenticate_user!, only: [:create, :uplikes, :downlikes]

  def create
    phrase = Phrase.find(params[:phrase_id])
    example = phrase.examples.create(example_params.merge(user_id: current_user.id))
    current_user.activity += 4
    current_user.save
    respond_with phrase, example
  end

  def uplikes
    @phrase = Phrase.find(params[:phrase_id])
    @example = @phrase.examples.find(params[:id])
    if @example.user_id != current_user.id
      unless @example.likes.any?{ |h| h.user_id == current_user.id}
        @example.increment!(:upvotes)
        @example.likes.create(user_id: current_user.id, count: 1)
        current_user.activity += 1
        current_user.save
        user = @phrase.user
        user.expertise += 1
        user.save
      end
    end
    respond_to do |format|
      format.json { render(json: @example, status: 200) }
    end
  end

  def downlikes
    @phrase = Phrase.find(params[:phrase_id])
    @example = @phrase.examples.find(params[:id])
    if @example.user_id != current_user.id
      unless @example.likes.any?{ |h| h.user_id == current_user.id}
        @example.decrement!(:upvotes)
        @example.likes.create(user_id: current_user.id, count: -1)
        current_user.activity += 1
        current_user.save
        user = @phrase.user
        user.expertise -= 1
        user.save
      end
    end
    respond_to do |format|
      format.json { render(json: @example, status: 200) }
    end
  end

  private
  def example_params
    params.require(:example).permit(:body)
  end

end
