class UsersController < ApplicationController
  def index
    user = User.all.order(:id)
    if params[:search_user_name]
      user = user.where(" user_name ILIKE ?", "%#{params[:search_user_name]}%")
    elsif params[:search_user_email]
      user = user.where(" email ILIKE ?", "%#{params[:search_user_email]}%")
    elsif params[:search_user_created]
      user = User.all.order(created_at: :desc)
    end
    render json: user.as_json
  end

  def create
    user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password]
    )
    if user.save
      render json: {status: "You have successly created a user"}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

  def show
    return_user = User.find_by(id: params[:id].to_i)
    render json: return_user.as_json
  end
end
