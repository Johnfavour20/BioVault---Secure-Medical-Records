// Note: This file is named FinancialsDashboard.tsx due to a project template.
// It contains the LoginScreen component for the BioVault application.
import React from 'react';
import DashboardCard from './DashboardCard';

interface LoginScreenProps {
  onLogin: (role: 'Patient' | 'Doctor') => void;
  onEmergency: () => void;
  message?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onEmergency, message }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <DashboardCard title="Welcome to BioVault" className="w-full max-w-md text-center">
        <p className="text-gray-400 mb-8">Your medical records, secured and controlled by you.</p>

        {message && (
          <div className="bg-blue-900/40 border border-blue-600 text-blue-200 px-4 py-3 rounded-lg relative mb-6 text-sm" role="alert">
            <p>{message}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => onLogin('Patient')}
            className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400"
          >
            Connect as Patient
          </button>
          <button
            onClick={() => onLogin('Doctor')}
            className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-400"
          >
            Connect as Provider
          </button>
          <button
            onClick={onEmergency}
            className="w-full mt-4 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-gray-700 text-gray-300 hover:bg-rose-600 hover:text-white"
          >
            Emergency Access
          </button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default LoginScreen;