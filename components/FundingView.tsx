
import React from 'react';
import DashboardCard from './DashboardCard';

interface EmergencyAccessProps {
  onAccess: () => void;
}

const EmergencyAccess: React.FC<EmergencyAccessProps> = ({ onAccess }) => {
    const [patientId, setPatientId] = React.useState('AC-0815');
    const [isRequesting, setIsRequesting] = React.useState(false);

    const handleRequest = () => {
        if (!patientId) return;
        setIsRequesting(true);
        // Simulate network delay
        setTimeout(() => {
            onAccess();
            setIsRequesting(false);
        }, 1500);
    }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <DashboardCard title="Emergency 'Break Glass' Access" className="w-full max-w-md">
        <p className="text-center text-yellow-400 mb-4 bg-yellow-900/30 p-3 rounded-lg text-sm">
            <strong>Warning:</strong> This action is for critical emergencies only and will be heavily audited.
        </p>
        <div className="space-y-4">
            <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-400 mb-1">Patient Identifier</label>
                <input 
                    type="text"
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., AC-0815"
                />
            </div>
            <button
                onClick={handleRequest}
                disabled={!patientId || isRequesting}
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 bg-rose-600 hover:bg-rose-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-rose-400"
            >
                {isRequesting ? 'Requesting...' : 'Request Emergency Access'}
            </button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default EmergencyAccess;