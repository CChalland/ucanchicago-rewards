class VictimsController < ApplicationController
  def index
    victim = Victim.all.order(:id)
    if params[:search_victim_email]
      victim = victim.where(" email ILIKE ?", "%#{params[:search_victim_email]}%")
    elsif params[:search_victim_created]
      victim = Victim.all.order(created_at: :desc)
    end
    render json: victim.as_json
  end

  def create
    victim = Victim.new(
      name: params[:name],
      email: params[:email],
      password: params[:password]
    )
    if victim.save
      render json: {status: "You have successly created a victim"}, status: :created
    else
      render json: {errors: victim.errors.full_messages}, status: :bad_request
    end
  end

  def show
    return_victim = Victim.find_by(id: params[:id].to_i)
    render json: return_victim.as_json
  end
end
