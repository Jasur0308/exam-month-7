import { Button, Table, notification } from 'antd';
import { useDeleteUsersMutation, useGetUsersQuery, useUpdateUsersMutation } from '../../../redux/api/users';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const { data } = useGetUsersQuery();
  const [deleteUser, { isSuccess, isError }] = useDeleteUsersMutation();
  const [updateUser] = useUpdateUsersMutation();

  // Trigger notification when deletion is successful or failed
  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "User Deleted",
        description: "The user was deleted successfully!",
      });
    }

    if (isError) {
      notification.error({
        message: "Delete Failed",
        description: "There was an error deleting the user.",
      });
    }
  }, [isSuccess, isError]); // Only run this effect when `isSuccess` or `isError` changes

  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'first_name',
    },
    {
      title: 'Lastname',
      dataIndex: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (url) => (
        <img
          width={50}
          src={url ? url : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
          alt="User"
        />
      ),
    },
    {
      title: 'Actions',
      render: (user) => (
        <div className="flex gap-4">
          <Link to='/dashboard/update-user'>
            <Button onClick={() => {
              {
                updateUser({ id: user.id })
              }
            }} type="primary">Update</Button>
          </Link>
          <Button
            onClick={() => {
              deleteUser({ id: user.id });
              console.log(user);
            }}
            danger
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <Table
        className="w-full"
        columns={columns}
        dataSource={data?.data}
        rowKey="id"
        size="middle"
        pagination={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default Users;