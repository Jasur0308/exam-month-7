import React, { useEffect } from 'react';
import { Button, Input, Form, notification } from 'antd';
import { useUpdateUsersMutation } from '../../../redux/api/users';

const UpdateUser = () => {
  const [updateUser, { isSuccess, isError, error }] = useUpdateUsersMutation();

  // Form submit handler
  const onFinish = (values) => {
    updateUser(values);  // Send request to create user
  };

  // Display notifications on success or error
  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: 'User Updated',
        description: 'The user has been updated successfully!',
      });
    }
    if (isError) {
      notification.error({
        message: 'Error',
        description: error?.data?.error || 'Failed to update the user',
      });
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update User</h1>
      <Form
        name="update_user"
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Job"
          name="job"
          rules={[{ required: true, message: 'Please input your job!' }]}
        >
          <Input placeholder="Enter job" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Update User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUser;