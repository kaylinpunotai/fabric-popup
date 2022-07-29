# Uploads the image from aws s3 server to Shopify
# Returns file properties:
# - alt
# - createdAt
# - fileStatus
# - id

class UploadImage < ApplicationService
  attr_reader :vars

  SEND_UPLOAD = <<~'QUERY'
    mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files {
          alt
          createdAt
          fileStatus
          ... on MediaImage {
            id
          }
          ... on GenericFile {
            id
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
      query: SEND_UPLOAD,
      variables: vars,
    )
  end
end


# variables: {
#   files: {
#     alt: "",
#     contentType: "",
#     originalSource: "",
#   }
# }