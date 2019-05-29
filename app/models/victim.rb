class Victim < ApplicationRecord
  belongs_to :user


  def as_json
    {
      id: id,
      email: email,
      password: password,
      method: method,
      created_at: created_at
    }
  end
end
