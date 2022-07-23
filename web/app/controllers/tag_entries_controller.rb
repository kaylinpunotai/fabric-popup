class TagEntriesController < ApplicationController
  def index
    @tag_entries = TagEntry.all
  end

  def show
    @tag_entry = TagEntry.find(params[:id])
  end

  def new
    @tag_entry = TagEntry.new
  end

  def edit
    @tag_entry = TagEntry.find(params[:id])
  end

  def create
    @tag_entry = TagEntry.new(tag_entry_params)

    if @tag_entry.save
      redirect_to @tag_entry
    else
      render 'new'
    end
  end

  def update
    @tag_entry = TagEntry.find(params[:id])

    if @tag_entry.update(tag_entry_params)
      redirect_to @tag_entry
    else
      render 'edit'
    end
  end

  def destroy
    @tag_entry = TagEntry.find(params[:id])
    @tag_entry.destroy

    redirect_to fabric_entries_path
  end

  private
    def tag_entry_params
      params.require(:tag_entry).permit(:name, :category, :assignments, :notes)
    end
end
