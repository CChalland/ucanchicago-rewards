class Victim < ApplicationRecord
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
