require 'test_helper'

class OutingsControllerTest < ActionController::TestCase
  setup do
    @outing = outings(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:outings)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create outing" do
    assert_difference('Outing.count') do
      post :create, outing: { course: @outing.course, start_time: @outing.start_time }
    end

    assert_redirected_to outing_path(assigns(:outing))
  end

  test "should show outing" do
    get :show, id: @outing
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @outing
    assert_response :success
  end

  test "should update outing" do
    patch :update, id: @outing, outing: { course: @outing.course, start_time: @outing.start_time }
    assert_redirected_to outing_path(assigns(:outing))
  end

  test "should destroy outing" do
    assert_difference('Outing.count', -1) do
      delete :destroy, id: @outing
    end

    assert_redirected_to outings_path
  end
end
