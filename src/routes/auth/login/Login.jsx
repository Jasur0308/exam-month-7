import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogInMutation } from "../../../redux/api/authApi";
import { logIn } from "../../../redux/slices/authSlices";
import { useEffect } from "react";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logInRequest, { data, isSuccess, isError, error }] = useLogInMutation();

  const onFinish = (values) => {
    logInRequest(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logIn({ token: data.token }));  // Correct token path
      notification.success({
        message: "Successfully logged in! Welcome 😊",
      });
      navigate("/dashboard/profile");
    }

    if (isError) {
      notification.error({
        message: "Login Failed",
        description: error?.data?.error || "An error occurred",
      });
    }
  }, [isSuccess, isError, dispatch, data, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form
        className="max-w-md w-full bg-white shadow-md rounded-lg p-8"
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Title level={2} className="text-center text-gray-800 mb-6">Login</Title>
        
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
          <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <div className="text-center mt-4">
          <Text className="text-gray-600">Don't have an account? <Link to="/auth/signup" className="text-blue-500 hover:underline">Sign Up</Link></Text>
        </div>
      </Form>
    </div>
  );
};

export default Login;