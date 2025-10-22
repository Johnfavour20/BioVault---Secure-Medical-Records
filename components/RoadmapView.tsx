
import React from 'react';
import DashboardCard from './DashboardCard';
import FileCard from './CompetitionView'; // Originally CompetitionView.tsx
import AuditLogTable from './RiskView'; // Originally RiskView.tsx
import RecordDetailModal from './RecordDetailModal'; // Import new component
import Chatbot from './Chatbot'; // Import the new Chatbot component
import { UploadIcon } from '../constants';
import { MedicalRecord, AuditLogEntry, User } from '../types';

interface PatientDashboardProps {
  patient: User;
  records: MedicalRecord[];
  logs: AuditLogEntry[];
  onGrantAccess: () => void;
  onViewAsDoctor: () => void;
  onRecordViewed: () => void; // Add prop for audit logging
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, records, logs, onGrantAccess, onViewAsDoctor, onRecordViewed }) => {
  const [showAccessModal, setShowAccessModal] = React.useState(false);
  const [accessGranted, setAccessGranted] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState<MedicalRecord | null>(null); // State for modal

  const handleRequestAccess = () => {
    setShowAccessModal(true);
  };

  const handleApprove = () => {
    onGrantAccess();
    setAccessGranted(true);
    setShowAccessModal(false);
  };
  
  const handleDeny = () => {
    // In a real app, this would also log a 'ACCESS_DENIED' event
    setShowAccessModal(false);
  };

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    onRecordViewed();
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
  };

  return (
    <>
      {/* Record Detail Modal */}
      {selectedRecord && (
        <RecordDetailModal record={selectedRecord} onClose={handleCloseModal} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Access Request Modal */}
        {showAccessModal && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="access-request-title"
          >
            <DashboardCard title="Access Request" titleId="access-request-title" className="w-full max-w-md">
              <p className="text-center text-lg mb-6">
                <strong className="text-cyan-300">Dr. Sarah Martinez</strong> is requesting access to your medical records.
              </p>
              <div className="flex justify-around">
                <button onClick={handleDeny} className="px-8 py-3 font-semibold rounded-lg bg-gray-700 hover:bg-rose-600 transition-colors">Deny</button>
                <button onClick={handleApprove} className="px-8 py-3 font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors">Approve</button>
              </div>
            </DashboardCard>
          </div>
        )}

        {/* Main Content: Records */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="My Medical Records">
            <div className="flex justify-end mb-4">
               <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
                  <UploadIcon />
                  Upload New Record
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.map(record => <FileCard key={record.id} record={record} onClick={() => handleViewRecord(record)} />)}
            </div>
          </DashboardCard>
          
          <DashboardCard title="Audit Log">
              <AuditLogTable logs={logs} />
          </DashboardCard>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <DashboardCard title="Ask Bio.AI Assistant">
            <Chatbot records={records} />
          </DashboardCard>

          <DashboardCard title="Grant Provider Access">
            <div className="flex flex-col items-center text-center">
              <p className="text-gray-400 mb-6">Click the button below to initiate a secure, temporary session for your provider.</p>
              <button 
                onClick={handleRequestAccess} 
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-400"
              >
                Grant Access
              </button>
            </div>
          </DashboardCard>
          
          {accessGranted && (
               <DashboardCard title="Simulation">
                  <p className="text-green-400 text-center mb-4">Access granted to Dr. Martinez!</p>
                  <button onClick={onViewAsDoctor} className="w-full px-4 py-2 font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
                      View Dashboard as Doctor
                  </button>
              </DashboardCard>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;