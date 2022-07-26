class TagEntriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @tag_entries = TagEntry.order(:name)
    render json: @tag_entries
  end

  def show
    @tag_entry = TagEntry.find(params[:id])
    render json: @tag_entry
  end

  def new
    @tag_entry = TagEntry.new
  end

  def edit
    @tag_entry = TagEntry.find(params[:id])
  end

  def create
    @tag_entry = TagEntry.create(tag_entry_params)
  end

  def update
    @tag_entry = TagEntry.find(params[:id])
    @tag_entry.update(tag_entry_params)
  end

  def destroy
    @tag_entry = TagEntry.find(params[:id])
    @tag_entry.destroy
  end

  def sort 
    @sorted = TagEntry.order(params.require(:column))
    render json: @sorted
  end

  def filter
    @filtered = TagEntry.where(tag_entry_params)
    render json: @filtered
  end

  def materials
    @filtered = TagEntry.where(category: "Material")
    @distinct = @filtered.distinct.pluck(:name)
    render json: @distinct
  end

  def colors
    @filtered = TagEntry.where(category: "Color")
    @distinct = @filtered.distinct.pluck(:name)
    render json: @distinct
  end

  private
    def tag_entry_params
      params.require(:tag_entry).permit(:name, :category, :assignments, :notes, :id)
    end
end
