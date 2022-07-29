# Queries Shopify files for image with creation date

class GetImage < ApplicationService
  attr_reader :vars

  GET_FILE = <<~'QUERY'
    query getFile ($input: String!) {
    # query getFile($id: ID!) {
      # node(id: $id) {
      #   ... on MediaImage {
      #     id
      #     image {
      #       url
      #       image
      #       preview
      #       status
      #       height
      #       width
      #     }
      #   }
      #   ... on GenericFile {
      #     id
      #     url
      #   }
      # }
      files (first: 1, query:$input, sortKey: CREATED_AT, reverse:true ) {
        edges {
          node {
            createdAt
            ... on MediaImage {
              id
              image {
                id
                url
              }
            }
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
      query: GET_FILE,
      variables: {input: vars},
    )
  end
end


# variables: {input: "created_at: 'xxxxx'"}