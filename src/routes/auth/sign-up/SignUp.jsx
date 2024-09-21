import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signUp } from "../../../redux/slices/authSlices";
import { useSignUpMutation } from "../../../redux/api/authApi";

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpRequest, { data, isSuccess, isError, error }] = useSignUpMutation();

  const onFinish = (values) => {
    signUpRequest(values); // Sending email and password
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(signUp({ token: data.token }));  // Correct token path
      notification.success({
        message: "Successfully signed up! Go ahead 😊",
      });
      navigate("/dashboard/profile");
    }

    if (isError) {
      notification.error({
        message: "Sign Up Failed",
        description: error?.data?.error || "An error occurred",
      });
    }
  }, [isSuccess, isError, dispatch, data, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <Title level={2} className="text-center text-gray-800 mb-6">
          Sign Up
        </Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              type="primary"
              htmlType="submit"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Text className="text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;