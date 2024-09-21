import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/authSlices';

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <nav className="bg-white shadow-md h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
          <button
            onClick={() => dispatch(logOut())}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Log out
          </button>
        </nav>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;