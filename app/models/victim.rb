class Victim < ApplicationRecord
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  
  belongs_to :user

  def decrypt
    decrypt_pass = password
  end


  def as_json
    {
      id: id,
      email: email,
      password: decrypt,
      method: method,
      created_at: created_at
    }
  end
end
