import React from 'react';
import { MedicalRecord, AuditLogEntry } from './types';

export const FileIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

export const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.463A10.5 10.5 0 011.5 10.5c0-4.349 2.704-8.033 6.563-9.694a.75.75 0 01.819.162z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM15 4.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM4.5 15a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75z" />
    </svg>
);


export const mockPatient = {
    id: 'pat_001',
    name: 'Alex Chen',
    role: 'Patient' as 'Patient',
};

export const mockDoctor = {
    id: 'doc_001',
    name: 'Dr. Sarah Martinez',
    role: 'Doctor' as 'Doctor',
};

export const mockMedicalRecords: MedicalRecord[] = [
    { 
        id: 'rec_01', 
        title: 'Annual Physical Results', 
        date: '2023-10-15', 
        type: 'Lab Report', 
        doctor: 'Dr. Emily Rodriguez',
        content: `
PATIENT: Alex Chen
DATE OF SERVICE: 2023-10-15
PROVIDER: Dr. Emily Rodriguez

SUBJECTIVE:
Patient presents for annual physical examination. Reports feeling well overall. No major complaints.
Maintains a balanced diet and exercises 3-4 times per week.

OBJECTIVE:
Vitals: BP 118/76, HR 68, Temp 98.6°F, SpO2 99%
General: Well-appearing, in no acute distress.
Cardiovascular: Regular rate and rhythm, no murmurs.
Lungs: Clear to auscultation bilaterally.

LABORATORY RESULTS:
- Complete Blood Count (CBC): Within normal limits.
- Lipid Panel:
  - Total Cholesterol: 195 mg/dL (Desirable)
  - HDL: 65 mg/dL (Excellent)
  - LDL: 110 mg/dL (Near Optimal)
  - Triglycerides: 100 mg/dL (Normal)
- Comprehensive Metabolic Panel (CMP): All values within normal range.
- Vitamin D, 25-Hydroxy: 28 ng/mL (Slightly low, recommend supplement)

ASSESSMENT:
Healthy 30-year-old male. Generally excellent health status. Mild vitamin D insufficiency.

PLAN:
1. Continue current lifestyle of healthy diet and regular exercise.
2. Recommend over-the-counter Vitamin D3 supplement, 2000 IU daily.
3. Follow up in 1 year for next annual physical, or sooner if any issues arise.
`
    },
    { 
        id: 'rec_02', 
        title: 'Chest X-Ray', 
        date: '2023-09-22', 
        type: 'Imaging', 
        doctor: 'Dr. James Thompson',
        content: `
PATIENT: Alex Chen
DATE OF STUDY: 2023-09-22
REFERRING PHYSICIAN: Dr. Sarah Martinez
RADIOLOGIST: Dr. James Thompson

EXAMINATION: Chest Radiograph, 2 views (PA and Lateral)

INDICATION: Persistent cough for 3 weeks.

FINDINGS:
Lungs: The lungs are well-expanded and clear. No evidence of consolidation, infiltrate, or effusion.
Pleura: No pleural thickening or effusion.
Heart: The cardiac silhouette is normal in size and contour.
Mediastinum: The mediastinal contours are unremarkable.
Bones: No acute fractures or destructive lesions identified in the visualized portions of the thoracic skeleton.

IMPRESSION:
Normal chest x-ray. No acute cardiopulmonary process identified. The patient's persistent cough is unlikely to be of pulmonary origin based on these findings. Clinical correlation is recommended.
`
    },
    { 
        id: 'rec_03', 
        title: 'Amoxicillin Prescription', 
        date: '2023-09-20', 
        type: 'Prescription', 
        doctor: 'Dr. Sarah Martinez',
        content: `
PRESCRIPTION DETAILS
PATIENT: Alex Chen
PRESCRIBER: Dr. Sarah Martinez
DATE: 2023-09-20

DRUG: Amoxicillin 500mg capsules
QUANTITY: 21 (twenty-one) capsules
SIG: Take one capsule by mouth three times daily for 7 days. Finish all medication even if feeling better.

INDICATION: Acute bacterial sinusitis.

REFILLS: 0
`
    },
    { 
        id: 'rec_04', 
        title: 'Dermatology Follow-up', 
        date: '2023-08-05', 
        type: 'Consultation Note', 
        doctor: 'Dr. Wei Zhang',
        content: `
PATIENT: Alex Chen
DATE: 2023-08-05
PROVIDER: Dr. Wei Zhang

HISTORY OF PRESENT ILLNESS:
Patient is here for a follow-up on a suspicious nevus on his left shoulder, first noted 2 months ago. A shave biopsy was performed on 2023-07-20.

BIOPSY RESULTS:
The pathology report returned as a benign compound nevus with no signs of dysplasia or malignancy.

EXAMINATION:
The biopsy site on the left shoulder is healing well, with minimal erythema and no signs of infection. A full-body skin examination was conducted and revealed no other suspicious lesions.

ASSESSMENT:
Benign nevus, left shoulder.
No evidence of skin cancer.

PLAN:
1. Reassure patient that the lesion was benign.
2. Advise on continued sun protection, including use of broad-spectrum sunscreen and protective clothing.
3. Recommend annual full-body skin exams.
4. Patient to return if he notices any new or changing lesions.
`
    },
];

export const mockAuditLog: AuditLogEntry[] = [
    { id: 'log_01', timestamp: '2023-10-28 10:05 AM', accessor: 'Alex Chen', action: 'RECORD_UPLOADED', isCritical: false },
    { id: 'log_02', timestamp: '2023-10-27 03:22 PM', accessor: 'Dr. Sarah Martinez', action: 'ACCESS_GRANTED', isCritical: false },
    { id: 'log_03', timestamp: '2023-10-27 03:21 PM', accessor: 'Dr. Sarah Martinez', action: 'ACCESS_DENIED', isCritical: false },
];