import React from 'react';
import Users from '../../components/users/Users';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-300 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
        </header>
        <Users/>
      </div>
    </div>
  );
};

export default Home;