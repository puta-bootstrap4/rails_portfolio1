module TokenAuthenticatable
    extend ActiveSupport::Concern
  #current_userがnilならtopページに遷移するような仕組みができていない
    included do
      before_action :authenticate_user_from_token!
    end
  
    private
  
    def authenticate_user_from_token!
      token = request.headers['Authorization']&.split(' ')&.last
      return render json: { error: 'Unauthorized' }, status: :unauthorized unless token
  
      payload = decode_token(token)
      @current_user = User.find_by(id: payload['user_id']) if payload
      render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
    end
  
    def decode_token(token)
      JWT.decode(token, Rails.application.secret_key_base).first
    rescue JWT::DecodeError
      nil
    end
end
  