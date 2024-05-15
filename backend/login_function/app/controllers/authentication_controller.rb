class AuthenticationController < ApplicationController
  include TokenAuthenticatable

  before_action :authenticate_user_from_token!, only: [:logout]
def signup
  user = User.new(user_params)
  if user.save
    token = create_token(user.id)
    refresh_token = SecureRandom.hex(20)
    refresh_token_expires_at = 24.hours.from_now  # 24時間後に設定
    ActiveRecord::Base.transaction do
      user.update!(refresh_token: refresh_token, refresh_token_expires_at: refresh_token_expires_at)
    end
    render json: {
        user: {
            token: token, 
            refresh_token: refresh_token,
            refresh_token_expires_at: refresh_token_expires_at
        }
    }
  else
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end
rescue => e
  render json: { error: e.message }, status: :internal_server_error
end


def login
  user = User.find_by_email(params[:user][:email])
  if user&.authenticate(params[:user][:password])
    token = create_token(user.id)
    refresh_token = SecureRandom.hex(20)
    refresh_token_expires_at = 24.hours.from_now  # 24時間後に設定
    user.update(refresh_token: refresh_token, refresh_token_expires_at: refresh_token_expires_at)

    render json: {
      user: {
        token: token,
        refresh_token: refresh_token,
        expires_at: refresh_token_expires_at
      }
    }

  else
    render json: { error: 'Invalid email or password' }, status: :unauthorized  end
end


def logout
  if @current_user
    blacklist_token
    render json: { message: 'Logged out successfully' }, status: :ok
  else
    render json: { error: 'No user to log out' }, status: :unauthorized
  end
end
private
def blacklist_token
  BlacklistedToken.create!(jti: request.headers['Authorization'].split(' ').last)
end
def create_token(user_id)
  expiration = 60.minutes.from_now.to_i  # 15分後が良いが60のタイムスタンプ
  payload = { user_id: user_id, exp: expiration }
  JWT.encode(payload, Rails.application.secret_key_base)
end

def refresh
  user = User.find_by(refresh_token: params[:refresh_token])

  if user && user.refresh_token_expires_at > Time.current
    token = create_token(user.id)
    render json: { token: token }
  else
    render status: :unauthorized
  end

end

def user_params
  params.require(:user).permit(:name, :email, :password)
end

end 
