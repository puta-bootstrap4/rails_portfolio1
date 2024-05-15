class CreateBlacklistedTokens < ActiveRecord::Migration[7.1]
  def change
    create_table :blacklisted_tokens do |t|
      t.string :jti

      t.timestamps
    end
    add_index :blacklisted_tokens, :jti
  end
end
