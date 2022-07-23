class FabricEntriesController < ApplicationController
  def index
    @fabric_entries = FabricEntry.all
    @tag_entries = TagEntry.all
  end

  def show
    @fabric_entry = FabricEntry.find(params[:id])
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
    @fabric_entry = FabricEntry.new(fabric_entry_params)
    @materials = TagEntry.where(:category => "Material").all
    @colors = TagEntry.where(:category => "Color").all

    if @fabric_entry.save
      redirect_to @fabric_entry
    else
      render 'new'
    end
  end

  def update
    @fabric_entry = FabricEntry.find(params[:id])
    @materials = TagEntry.where(:category => "Material").all
    @colors = TagEntry.where(:category => "Color").all

    if @fabric_entry.update(fabric_entry_params)
      redirect_to @fabric_entry
    else
      render 'edit'
    end
  end

  def destroy
    @fabric_entry = FabricEntry.find(params[:id])
    @fabric_entry.destroy

    redirect_to fabric_entries_path
  end

  private
    def fabric_entry_params
      params.require(:fabric_entry).permit(:image, :title, {:material => []}, {:color => []}, :status, :notes)
    end
end
