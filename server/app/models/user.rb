class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  has_many :outings, foreign_key: "creator_id"
  has_many :outing_player, foreign_key: "user_id"
  has_many :registered_outings, :through => :outing_player

  def self.find_or_create_from_auth_hash(auth_hash)
  	find_by_auth_hash(auth_hash) || create_from_auth_hash(auth_hash)
  end

  def self.find_by_auth_hash(auth_hash)
  	where(
  		provider: auth_hash.provider,
  		uid: auth_hash.uid
  	).first
  end

  def self.create_from_auth_hash(auth_hash)
  	create(
  		provider: auth_hash.provider,
  		uid: auth_hash.uid,
  		email: auth_hash.info.email,
  		name: auth_hash.info.name,
  		oauth_token: auth_hash.credentials.token,
  		oauth_expires_at: Time.at(auth_hash.credentials.expires_at)
	)
  end

  def password_required?
  	super && provider.blank?
  end

  def update_with_password(params, *options)
  	if encrypted_password.blank?
  		update_attributes(params, *options)
  	else
  		super
  	end
  end

  def facebook
  	@facebook ||= Koala::Facebook::API.new(oauth_token)
  end

  def get_profile_picture
    self.facebook.get_picture(uid)
  end
end
