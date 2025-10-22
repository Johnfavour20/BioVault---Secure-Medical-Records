import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl mb-8">
      <div className="flex items-center space-x-3">
        <svg className="w-8 h-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          BioVault
        </h1>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, <strong className="font-medium text-white">{user.name}</strong> ({user.role})</span>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-gray-700 text-gray-300 hover:bg-rose-600 hover:text-white"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;