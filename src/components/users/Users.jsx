import React, { useState } from 'react';
import { useGetUsersQuery } from '../../redux/api/users';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar'; // Import the SearchBar component

const Users = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);

  if (isLoading) return <Spin className="flex justify-center items-center mt-16" />;

  const users = data?.data || [];

  // Function to handle search
  const handleSearch = (searchTerm) => {
    const filtered = users.filter(user =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Display the full user list if no search term is provided
  const displayUsers = filteredUsers.length > 0 ? filteredUsers : users;

  return (
    <div className="max-w-5xl w-full mx-auto mt-10">
      {/* Search Bar */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-400 py-4 px-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white">Hello ReqRes users!</h1>
        <SearchBar 
          placeholder="Search users by name or email" 
          onSearch={handleSearch} 
          className="w-80 border-0 outline-none p-2 rounded-md shadow-inner"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {displayUsers.map(user => (
          <div 
            key={user.id} 
            className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img 
              src={user.avatar} 
              alt={user.first_name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-1 items-center">
              <p className="text-center text-2xl font-semibold text-gray-800 mb-2">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-center text-lg text-gray-600 mb-4">{user.email}</p>
              <Link to={`/users/${user.id}`}>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white text-lg py-2 px-12 rounded-md hover:bg-blue-600 transition duration-200">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;