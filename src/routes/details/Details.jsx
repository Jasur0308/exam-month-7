import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from '../../redux/api/singlePage';  // Make sure to import it correctly

const Details = () => {
  const { id } = useParams();  // Get the user ID from the URL
  const { data, isLoading } = useGetSingleUserQuery(id);
  const user = data?.data;  // The reqres API returns user details under `data`

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {user ? (
        <div className="flex flex-col items-center gap-8">
          <p className="text-3xl font-bold text-blue-600 text-center mb-4">
            {user.first_name} {user.last_name}
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <img
              className="w-full max-w-md rounded-lg shadow-md object-cover"
              src={user.avatar}
              alt={user.first_name}
            />
            <div className="flex flex-col gap-4">
              <p className="flex text-gray-700">Email: <span>{user.email}</span></p>
              <strong className="text-xl font-semibold text-blue-600">
                ID: {user.id}
              </strong>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">User not found</p>
      )}
    </div>
  );
};

export default Details;