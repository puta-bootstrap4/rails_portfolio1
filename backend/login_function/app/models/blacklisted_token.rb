class BlacklistedToken < ApplicationRecord
    validates :jti, presence: true, uniqueness: true
end
