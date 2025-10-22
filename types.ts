export type View = 'LOGIN' | 'PATIENT_DASHBOARD' | 'DOCTOR_VIEW' | 'EMERGENCY_VIEW';

export interface User {
  id: string;
  name: string;
  role: 'Patient' | 'Doctor';
}

export interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  type: 'Lab Report' | 'Imaging' | 'Prescription' | 'Consultation Note';
  doctor: string;
  content: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  accessor: string;
  action: 'ACCESS_GRANTED' | 'ACCESS_REVOKED' | 'RECORD_VIEWED' | 'EMERGENCY_ACCESS' | 'ACCESS_DENIED' | 'RECORD_UPLOADED';
  isCritical: boolean;
}