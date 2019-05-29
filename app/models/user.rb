class User < ApplicationRecord
  has_secure_password

  has_many :victims

  validates :email, presence: true, uniqueness: true
end
