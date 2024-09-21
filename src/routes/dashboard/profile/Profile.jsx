import { BsStars } from "react-icons/bs";
import React from 'react';
import { useGetProfileQuery } from '../../../redux/api/users'; // Ensure this endpoint fetches the correct user data
import { useDispatch } from 'react-redux'; 
import { logOut } from '../../../redux/slices/authSlices'; // Import logOut action

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery(); // Adjust query hook as needed
  const dispatch = useDispatch(); // Use dispatch for logout

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-r from-gray-100 to-white shadow-lg rounded-lg border border-gray-300">
      <div className="flex flex-col items-center gap-8">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : data ? (
          <>
            {/* Profile Avatar */}
            <div className="relative">
              <img
                className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
                src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                alt="Profile"
              />
              <span className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <BsStars className="text-white text-xl" />
              </span>
            </div>

            {/* User Information */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-semibold text-gray-900">{`${data.first_name} ${data.last_name}`}</h1>
              <p className="text-lg font-medium text-gray-600">{data.email}</p>
              <p className="text-md text-gray-500">Joined on: {new Date(data.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center mt-4 space-x-2">
              {[...Array(5)].map((_, index) => (
                <BsStars key={index} className="text-yellow-500 text-2xl" />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                Edit Profile
              </button>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                onClick={() => dispatch(logOut())}  // Dispatch logOut action on click
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">User not found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;