# frozen_string_literal: true

require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ShopifyAppTemplateRuby
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults(7.0)

    config.assets.prefix = "/api/assets"

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # ShopifyAPI::Context.setup(
    #   api_key: "<api-key>",
    #   api_secret_key: "<api-secret-key>",
    #   host_name: "<application-host-name>",
    #   scope: "read_orders,read_products,etc",
    #   session_storage: ShopifyAPI::Auth::FileSessionStorage.new, # This is only to be used for testing, more information in session docs
    #   is_embedded: true, # Set to true if you are building an embedded app
    #   is_private: false, # Set to true if you are building a private app
    #   api_version: "2021-01" # The vesion of the API you would like to use
    # )
  end
end
