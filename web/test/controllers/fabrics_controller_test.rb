require "test_helper"

class FabricsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get fabrics_index_url
    assert_response :success
  end
end
