
import React from 'react';
import DashboardCard from './DashboardCard';
import FileCard from './CompetitionView'; // Originally CompetitionView.tsx
import RecordDetailModal from './RecordDetailModal'; // Import new component
import { MedicalRecord, User } from '../types';

interface DoctorViewProps {
  patient: User;
  records: MedicalRecord[];
  onEndSession: () => void;
  onRecordViewed: () => void; // Add prop for audit logging
}

const DoctorView: React.FC<DoctorViewProps> = ({ patient, records, onEndSession, onRecordViewed }) => {
  const [selectedRecord, setSelectedRecord] = React.useState<MedicalRecord | null>(null); // State for modal

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

      <div>
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Viewing Records for <span className="text-cyan-300">{patient.name}</span></h2>
            <p className="text-gray-400">Access granted for this session only.</p>
         </div>

         <DashboardCard title="Patient Medical Records">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {records.map(record => <FileCard key={record.id} record={record} onClick={() => handleViewRecord(record)} />)}
              </div>
         </DashboardCard>

         <div className="mt-8 text-center">
          <button onClick={onEndSession} className="px-6 py-3 font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 transition-colors">
              End Session & Revoke Access
          </button>
         </div>
      </div>
    </>
  );
};

export default DoctorView;