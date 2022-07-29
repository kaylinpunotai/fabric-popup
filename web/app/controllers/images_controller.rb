class ImagesController < AuthenticatedController

  def create
    input = {
      input: {
        filename: params[:input][:filename],
        fileSize: params[:input][:fileSize].to_s,
        httpMethod: params[:input][:httpMethod],
        mimeType: params[:input][:mimeType],
        resource: params[:input][:resource],
      }
    }
    @newimage = NewImage.call(vars: input)

    success = true
    error = nil
    status_code = 200
  rescue => e
    success = false
    error = e.message
    status_code = e.is_a?(ShopifyAPI::Errors::HttpResponseError) ? e.code: 500

    logger.warn("\033[35mImage create failed: #{error}\033[0m")
  ensure
    render json: @newimage.body["data"]["stagedUploadsCreate"]["stagedTargets"][0]
  end

  def upload
    resource_url = params[:resourceUrl]
    upload_input = {
      files: {
        contentType: "IMAGE",
        originalSource: resource_url
      }
    }
    @output = UploadImage.call(vars: upload_input)

    success = true
    error = nil
    status_code = 200
  rescue => e
    success = false
    error = e.message
    status_code = e.is_a?(ShopifyAPI::Errors::HttpResponseError) ? e.code: 500

    logger.warn("\033[35mImage upload failed: #{error}\033[0m")
  ensure
    render json: @output.body["data"]["fileCreate"]["files"][0]
  end

  def get
    createdAt = params[:creation]
    get_input = "created_at:'#{createdAt}'"
    @output = GetImage.call(vars: get_input)

    success = true
    error = nil
    status_code = 200
  rescue => e
    success = false
    error = e.message
    status_code = e.is_a?(ShopifyAPI::Errors::HttpResponseError) ? e.code: 500

    logger.warn("\033[35mImage get failed: #{error}\033[0m")
  ensure
    render json: @output.body["data"]["files"]["edges"][0]["node"]
  end
end
