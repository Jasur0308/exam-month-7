import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbBrandGravatar } from "react-icons/tb";
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/authSlices'; // Import logOut action

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { token, profile } = useSelector(state => state.auth);
  const dispatch = useDispatch(); // Use dispatch to handle logout

  // Define the menu for the Dropdown
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/dashboard/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        {/* Logout Button */}
        <Button type="link" onClick={() => dispatch(logOut())}>Logout</Button>
      </Menu.Item>
    </Menu>
  );

  // Hide the header in certain routes
  if (pathname.includes("auth") || pathname.includes("dashboard")) return null;

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Mobile Menu Button */}
        <Button
          className="block lg:hidden"
          icon={<MenuOutlined />}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center bg-white p-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="font-extrabold text-2xl text-purple-600">MyApp</span>
            <TbBrandGravatar className="text-blue-500 text-3xl ml-2" />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={`flex space-x-8 text-white text-lg font-semibold ${isMenuOpen ? 'block' : 'hidden'} lg:flex`}>
          <li>
            <Link to="/" className="hover:text-yellow-300 hover:underline transition ease-in-out duration-200">
              Home
            </Link>
          </li>
          {token ? (
            <li>
              <Dropdown overlay={menu} trigger={['click']}>
                <Button icon={<UserOutlined />} className="hover:text-yellow-300 transition ease-in-out duration-200">
                  {profile?.profilePictureUrl ? (
                    <img
                      src={profile.profilePictureUrl}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ) : (
                    <span>User</span>
                  )}
                </Button>
              </Dropdown>
            </li>
          ) : (
            <>
              <li>
                <Link to="auth/signUp" className="hover:text-yellow-300 hover:underline transition ease-in-out duration-200">
                  Register
                </Link>
              </li>
              <li>
                <Link to="auth/login" className="hover:text-yellow-300 hover:underline transition ease-in-out duration-200">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;