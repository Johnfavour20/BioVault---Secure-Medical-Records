
import React from 'react';
import Header from './components/Header';
import LoginScreen from './components/FinancialsDashboard'; // Originally FinancialsDashboard.tsx
import PatientDashboard from './components/RoadmapView'; // Originally RoadmapView.tsx
import DoctorView from './components/TeamView'; // Originally TeamView.tsx
import EmergencyAccess from './components/FundingView'; // Originally FundingView.tsx

import { View, User, AuditLogEntry } from './types';
import { mockPatient, mockDoctor, mockMedicalRecords, mockAuditLog } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<View>('LOGIN');
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [auditLog, setAuditLog] = React.useState<AuditLogEntry[]>(mockAuditLog);
  const [loginMessage, setLoginMessage] = React.useState<string>('');

  const addAuditLog = (accessor: string, action: AuditLogEntry['action'], isCritical: boolean = false) => {
    const newLog: AuditLogEntry = {
      id: `log_${auditLog.length + 1}`,
      timestamp: new Date().toLocaleString(),
      accessor,
      action,
      isCritical
    };
    setAuditLog(prev => [...prev, newLog]);
  }

  const handleLogin = (role: 'Patient' | 'Doctor') => {
    setLoginMessage(''); // Clear message on any attempt
    if (role === 'Patient') {
      setCurrentUser(mockPatient);
      setCurrentView('PATIENT_DASHBOARD');
    } else {
      // For the demo, inform the provider they need patient-initiated access.
      // Do not log in the doctor directly.
      setLoginMessage("Provider access must be initiated by the patient. Please ask the patient to log in and grant access via the QR code simulation.");
    }
  };

  const handleLogout = () => {
    addAuditLog(currentUser?.name || 'User', 'ACCESS_REVOKED');
    setCurrentUser(null);
    setCurrentView('LOGIN');
  };

  const handleEmergency = () => {
    setCurrentView('EMERGENCY_VIEW');
  };

  const handleEmergencyAccess = () => {
    addAuditLog('Emergency Services', 'EMERGENCY_ACCESS', true);
    setCurrentUser({ ...mockDoctor, name: 'Emergency Responder' });
    setCurrentView('DOCTOR_VIEW');
  };

  const handleGrantAccess = () => {
    addAuditLog(mockDoctor.name, 'ACCESS_GRANTED');
  };

  const handleRecordViewed = () => {
    if (currentUser) {
      addAuditLog(currentUser.name, 'RECORD_VIEWED');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header user={currentUser} onLogout={handleLogout} />
        
        <main className="mt-8">
          {currentView === 'LOGIN' && <LoginScreen onLogin={handleLogin} onEmergency={handleEmergency} message={loginMessage} />}
          {currentView === 'PATIENT_DASHBOARD' && currentUser && (
            <PatientDashboard 
              patient={currentUser} 
              records={mockMedicalRecords} 
              logs={auditLog}
              onGrantAccess={handleGrantAccess}
              onViewAsDoctor={() => {
                setCurrentUser(mockDoctor);
                setCurrentView('DOCTOR_VIEW');
              }}
              onRecordViewed={handleRecordViewed}
            />
          )}
          {currentView === 'DOCTOR_VIEW' && currentUser && (
             <DoctorView 
                patient={mockPatient}
                records={mockMedicalRecords}
                onEndSession={handleLogout}
                onRecordViewed={handleRecordViewed}
             />
          )}
          {currentView === 'EMERGENCY_VIEW' && (
            <EmergencyAccess onAccess={handleEmergencyAccess} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;