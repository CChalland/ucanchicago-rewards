class Victim < ApplicationRecord
  validates :email, email: true
  validates :password, presence: true, uniqueness: true
end
