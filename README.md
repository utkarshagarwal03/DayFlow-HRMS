# 🏢 Dayflow HRMS — Enterprise Human Resource Management Suite
https://day-flow-hrms-eta.vercel.app/

**Dayflow HRMS** is an industrial-grade, enterprise-ready Human Resource Management System built to streamline corporate workforce operations, attendance logging, leave approvals, statutory payroll processing, and performance appraisals.

---

## 🌟 Key Features & Modules

### 1. 👥 Dynamic Employee Directory & Profile Hub
- **Interactive Directory**: Search, filter by department, and inspect complete workforce profiles.
- **Detailed Employee Dossier**: Resume preview, technical skills tagger, emergency contacts, bank accounts (IFSC, PAN, UAN), and security details.
- **Onboarding Modal**: Register new employees into the persistent database with automatic initial setup.

### 2. ⏱️ Live Attendance Ticker & System Log
- **Real-Time Workday Clock**: Interactive check-in/check-out ticker tracking precise work hours and minutes.
- **Daily Ledger History**: Detailed attendance logs displaying check-in times, work hours, overtime, and presence status.

### 3. 🏖️ Leave Management & Approval Portal
- **Leave Request Engine**: Apply for Paid Leaves, Sick Leaves, and Unpaid Time Off with auto-calculated date ranges.
- **HR Approval Workflow**: Admins can approve or reject pending leave requests with custom reviewer notes.
- **2026 Corporate Holiday Calendar**: Interactive schedule of company-wide official holidays.

### 4. 💸 Statutory Payroll & PDF Payslip Generator
- **Payroll Breakdown**: Automated base wage, HRA, special allowances, PF deductions, income tax, and net payable calculations.
- **Formal Payslip Generator**: Printable monthly salary slips formatted for enterprise compliance.

### 5. 🎯 Performance Appraisals & OKR Tracking
- **Quarterly Goal Reviews**: Track individual employee OKRs, manager feedback, and 5.0 rating scale evaluations.

### 6. 📊 Real-Time HR Analytics Dashboard
- **Executive Overview**: Department distribution charts, attendance health ratios, and leave utilization metrics.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend API**: Express.js REST API (`http://localhost:5000/api`)
- **Database & Auth**: Firebase Firestore (NoSQL Document Store) & Firebase Auth SDK
- **Data Persistence**: Unified local fallback cache (`localStorage`) + Firestore Cloud DB

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/utkarshagarwal03/DayFlow-HRMS.git
cd DayFlow-HRMS
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000

# Client-Side Firebase Configuration (Vite)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Server-Side Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
```

### 5. Run the Application
Start the frontend development server:
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

To start the Express backend REST API server:
```bash
npm run dev:server
```

---

## 📁 Project Directory Structure

```
dayflow-hrms/
├── server/
│   ├── index.js              # Express REST API Server
│   └── firebase.js           # Server Firebase Admin SDK Config
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Navigation Header & Role Switcher
│   │   ├── EmployeeDirectory.jsx # Directory View & Search Filter
│   │   ├── ProfileView.jsx    # Complete Profile & Security Tab
│   │   ├── AttendanceView.jsx # Attendance Ledger & Clock Ticker
│   │   ├── LeaveView.jsx     # Time Off Requests & Holiday Calendar
│   │   ├── PayrollView.jsx   # Salary Calculator & Slips
│   │   ├── PerformanceView.jsx# OKR & Performance Appraisals
│   │   ├── AnalyticsView.jsx # HR Metric Charts & Dashboard
│   │   ├── PayslipModal.jsx  # Printable Payslip Generator
│   │   └── AuthModal.jsx     # Database Email Authentication
│   ├── services/
│   │   ├── api.js            # REST API Client Hooks
│   │   └── firebase.js       # Client Firebase SDK Init
│   ├── utils/
│   │   └── storage.js        # Local Persistence Manager
│   ├── App.jsx               # Application Root & Router State
│   ├── index.css             # Industrial SaaS Design Tokens
│   └── main.jsx              # React DOM Entry
├── public/                   # Static Assets & Logos
├── package.json              # Project Dependencies
├── vite.config.js            # Vite Build Configuration
└── README.md                 # Documentation
```

---

## 📄 License
This project is licensed under the MIT License.
