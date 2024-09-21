import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`transition-all duration-300 flex-1 ${isExpanded ? 'max-w-[250px]' : 'max-w-[80px]'} bg-blue-500 min-h-screen p-4`}>
      <button 
        className="text-white mb-6 w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        onClick={toggleSidebar}
      >
        <MenuOutlined />
      </button>
      <ul className={`flex flex-col gap-6 ${isExpanded ? 'pl-4' : 'pl-0'}`}>
        <li>
          <NavLink className="text-white" to="/">
            {isExpanded ? 'Home' : 'H'}
          </NavLink>
        </li>
        <li>
          <NavLink className="text-white" to="/dashboard/profile">
            {isExpanded ? 'Profile' : 'P'}
          </NavLink>
        </li>
        <li>
          <NavLink className="text-white" to="/dashboard/users">
            {isExpanded ? 'Users' : 'U'}
          </NavLink>
        </li>
        <li>
          <NavLink className="text-white" to="/dashboard/create-user">
            {isExpanded ? 'Create User' : 'C'}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;