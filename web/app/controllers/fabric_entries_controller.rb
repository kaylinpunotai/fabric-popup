class FabricEntriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @fabric_entries = FabricEntry.order(:title)
    render json: @fabric_entries
  end

  def show
    @fabric_entry = FabricEntry.find(params[:id])
    render json: @fabric_entry
  end

  def new
    @fabric_entry = FabricEntry.new
    @materials = TagEntry.where(:category => "Material").all
    @colors = TagEntry.where(:category => "Color").all
  end

  def edit
    @fabric_entry = FabricEntry.find(params[:id])
    @materials = TagEntry.where(:category => "Material").all
    @colors = TagEntry.where(:category => "Color").all
  end

  def create
    @fabric_entry = FabricEntry.create(fabric_entry_params)
  end

  def update
    @fabric_entry = FabricEntry.find(params[:id])
    @fabric_entry.update(fabric_entry_params)
  end

  def destroy
    @fabric_entry = FabricEntry.find(params[:id])
    @fabric_entry.destroy
  end

  def sort 
    @sorted = FabricEntry.order(params.require(:column))
    render json: @sorted
  end

  def filter
    @filtered = FabricEntry.where(tag_entry_params)
    render json: @filtered
  end

  def active
    @filtered = FabricEntry.where(status: "Active")
    @distinct = @filtered.distinct.pluck(:title)
    render json: @distinct
  end

  def hidden
    @filtered = FabricEntry.where(status: "Hidden")
    @distinct = @filtered.distinct.pluck(:title)
    render json: @distinct
  end

  private
    def fabric_entry_params
      params.require(:fabric_entry).permit(:image, :title, {:material => []}, {:color => []}, :status, :notes, :id)
    end
end
