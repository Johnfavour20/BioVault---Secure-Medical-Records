# BioVault - Secure Medical Records

## 1. Project Overview

BioVault is a high-fidelity prototype of a decentralized application for securely storing and sharing medical records. Built for a hackathon setting, it demonstrates a user-centric approach to healthcare data management, where patients have full control over who can access their sensitive information. The application simulates a blockchain-backed system, showcasing core functionalities like patient-controlled access, temporary provider sessions, emergency "break-glass" access, and a transparent, immutable audit log.

At its core, BioVault aims to solve the problem of fragmented and insecure medical records by putting the patient in charge, leveraging modern web technologies and a UX-focused design.

## 2. Key Features

- **Patient-Centric Control**: Patients are the gatekeepers of their data. They can view their records, upload new ones (simulated), and grant access to providers on a case-by-case basis.
- **Secure Access Delegation**: Access is granted via a QR code simulation. The patient approves a provider's request in real-time, creating a temporary, auditable session for the provider to view records.
- **Role-Based Views**: Distinct dashboard experiences for Patients and Doctors. Doctors can only view records for the patient who has granted them access, and only for the duration of the session.
- **Emergency "Break-Glass" Access**: A critical feature for real-world scenarios, allowing authorized emergency personnel to access a patient's records by providing a unique identifier. This action is flagged as a high-priority event in the audit log.
- **Immutable Audit Log**: Every significant action within the system—access grants, record views, emergency access, access revocations—is recorded in a transparent log, simulating the immutability of a blockchain ledger.
- **AI-Powered Summaries**: Utilizes the Google Gemini API to provide patients and doctors with easy-to-understand summaries of complex medical documents, improving health literacy and efficiency.

## 3. Technology Stack

- **Frontend Framework**: **React 19** with TypeScript for a modern, type-safe, and component-based architecture.
- **Styling**: **Tailwind CSS** for rapid, utility-first UI development, enabling a sleek and responsive design.
- **AI Integration**: **Google Gemini API (`gemini-2.5-flash`)** for the "Summarize with AI" feature, demonstrating the power of generative AI in healthcare.
- **QR Code Generation**: `qrcode.react` library for generating the access request QR codes.
- **Development Environment**: The application runs in a browser-based environment with ES modules and an import map, removing the need for a local build step.

## 4. Project Structure

The project is organized into a `components` directory, a `types.ts` file for shared type definitions, and a `constants.tsx` file for mock data and icons.

```
/
├── index.html            # Entry point, includes import maps and loads the app
├── index.tsx             # Renders the React application into the DOM
├── App.tsx               # Main application component, handles state management and routing
├── types.ts              # TypeScript interfaces for User, MedicalRecord, etc.
├── constants.tsx         # Mock data (patients, records, logs) and SVG icons
├── metadata.json         # Project metadata
├── README.md             # This file
└── components/
    ├── Header.tsx                 # Top navigation bar
    ├── DashboardCard.tsx          # Reusable card component for UI sections
    ├── FinancialsDashboard.tsx    # (LoginScreen.tsx) - The initial login screen
    ├── RoadmapView.tsx            # (PatientDashboard.tsx) - Patient's main view
    ├── TeamView.tsx               # (DoctorView.tsx) - Provider's view of patient data
    ├── FundingView.tsx            # (EmergencyAccess.tsx) - The emergency access screen
    ├── RiskView.tsx               # (AuditLogTable.tsx) - Displays the audit log
    ├── CompetitionView.tsx        # (FileCard.tsx) - A card for a single medical record
    └── RecordDetailModal.tsx      # Modal to show record details and AI summary
```

> **Note on File Naming**: The filenames within the `components` directory (e.g., `FinancialsDashboard.tsx`, `RoadmapView.tsx`) are from a template and do not directly correspond to the component names (e.g., `LoginScreen`, `PatientDashboard`). The comments in `App.tsx` and the structure breakdown above clarify the mapping. This is a known issue that would be rectified in a production environment.

## 5. Key Workflows

### a. Patient Login & Dashboard
1.  The user selects "Connect as Patient" on the login screen.
2.  They are logged in as the mock patient, Alex Chen, and see the Patient Dashboard.
3.  This dashboard contains their medical records, an audit log of all activity, and the tools to grant access to a provider.

### b. Granting Access to a Provider
1.  The patient needs to share their records with their doctor (Dr. Martinez).
2.  On the Patient Dashboard, there is a "Grant Provider Access" section with a QR code.
3.  The patient clicks "Simulate Provider Scan".
4.  A modal appears, asking the patient to approve or deny the access request from Dr. Martinez.
5.  Upon approval, the action is logged, and a new "View Dashboard as Doctor" button appears. This simulates the session being created.

### c. Doctor's Session View
1.  After access is granted, clicking the "View Dashboard as Doctor" button transitions the view.
2.  The UI now reflects the doctor's perspective, showing Alex Chen's records.
3.  The doctor can view the details of each record and use the AI summary feature.
4.  When finished, the doctor clicks "End Session & Revoke Access", which logs them out and securely ends the temporary access session.

### d. Emergency Access
1.  On the login screen, a user can select "Emergency Access".
2.  This leads to a "Break Glass" screen.
3.  The user (e.g., a paramedic) enters the patient's identifier.
4.  Upon requesting access, a critical event is logged, and they are immediately given access to the patient's records to handle the emergency.

## 6. Future Improvements

This prototype lays a strong foundation. Future development could include:
- **Real Blockchain Integration**: Replace the mock data and state management with a real backend connected to a smart contract on a blockchain (e.g., Ethereum, Hyperledger) for true decentralization and immutability.
- **Real-time Notifications**: Implement WebSockets or a similar technology to push access requests to the patient's device in real-time when a provider scans their QR code.
- **Multi-Provider/Patient Support**: Expand the system to support multiple patients and doctors with a proper database and authentication system.
- **Record Upload & Verification**: Build out the functionality for patients to upload new medical documents, potentially with a mechanism for healthcare providers to verify their authenticity on-chain.
- **Advanced Permissions**: Allow patients to set granular permissions, such as granting access to specific records or for a limited time window.