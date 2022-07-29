# Creates a temporary upload to shopify's aws s3 servers

class NewImage < ApplicationService
  attr_reader :vars

  CREATE_UPLOAD = <<~'QUERY'
    mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url,
          resourceUrl
          parameters {
            name
            value
          }
        }
      }
    }
  QUERY

  def initialize(vars:, session: ShopifyAPI::Context.active_session)
    super()
    @vars = vars
    @session = session
  end

  def call
    client = ShopifyAPI::Clients::Graphql::Admin.new(session: @session)
    response = client.query(
      query: CREATE_UPLOAD,
      variables: vars
    )
  end

end


# variables: {
#   input: {
#     filename: "",
#     fileSize: "",
#     httpMethod: "POST",
#     mimeType: "image/jpeg",
#     resource: "IMAGE",
#   }
# }