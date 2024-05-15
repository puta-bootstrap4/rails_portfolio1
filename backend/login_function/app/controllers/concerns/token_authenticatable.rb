module TokenAuthenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_from_token!
  end

  private

  def authenticate_user_from_token!
    token = request.headers['Authorization']&.split(' ')&.last
    unless token
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    payload = decode_token(token)
    if payload
      @current_user = User.find_by(id: payload['user_id'])
    end

    unless @current_user
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def decode_token(token)
    JWT.decode(token, Rails.application.secret_key_base).first
  rescue JWT::DecodeError
    nil
  end
end
