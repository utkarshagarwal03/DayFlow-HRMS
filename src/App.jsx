import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EmployeeDirectory from './components/EmployeeDirectory';
import ProfileView from './components/ProfileView';
import AttendanceView from './components/AttendanceView';
import LeaveView from './components/LeaveView';
import PayrollView from './components/PayrollView';
import PerformanceView from './components/PerformanceView';
import AnalyticsView from './components/AnalyticsView';
import PayslipModal from './components/PayslipModal';
import AuthModal from './components/AuthModal';

import { 
  loadEmployees, saveEmployees, 
  loadAttendanceLogs, saveAttendanceLogs, 
  loadLeaveRequests, saveLeaveRequests, 
  loadPerformanceData, savePerformanceData,
  loadAuthSession, saveAuthSession, clearAuthSession
} from './utils/storage';

export default function App() {
  const [employees, setEmployees] = useState(() => loadEmployees());
  const [attendanceLogs, setAttendanceLogs] = useState(() => loadAttendanceLogs());
  const [leaveRequests, setLeaveRequests] = useState(() => loadLeaveRequests());
  const [performanceData, setPerformanceData] = useState(() => loadPerformanceData());

  const savedSession = loadAuthSession();

  const [isAuthenticated, setIsAuthenticated] = useState(() => savedSession ? savedSession.isAuthenticated : false);
  const [activeTab, setActiveTab] = useState('employees');
  const [currentUserRole, setCurrentUserRole] = useState(() => savedSession ? savedSession.currentUserRole : 'employee');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isProfileViewOnly, setIsProfileViewOnly] = useState(true);
  
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState(new Date().toISOString());

  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [payslipEmployee, setPayslipEmployee] = useState(null);

  const [currentEmployee, setCurrentEmployee] = useState(() => savedSession ? savedSession.currentEmployee : null);

  useEffect(() => {
    saveEmployees(employees);
  }, [employees]);

  useEffect(() => {
    saveAttendanceLogs(attendanceLogs);
  }, [attendanceLogs]);

  useEffect(() => {
    saveLeaveRequests(leaveRequests);
  }, [leaveRequests]);

  useEffect(() => {
    savePerformanceData(performanceData);
  }, [performanceData]);

  const handleLoginSuccess = (userObj, roleType) => {
    const effectiveRole = userObj.role || roleType || 'employee';

    setEmployees(prev => {
      const exists = prev.some(e => e.email.toLowerCase() === userObj.email.toLowerCase() || e.id === userObj.id);
      if (!exists) {
        return [userObj, ...prev];
      }
      return prev.map(e => (e.email.toLowerCase() === userObj.email.toLowerCase() || e.id === userObj.id) ? { ...e, ...userObj } : e);
    });

    setCurrentEmployee(userObj);
    setCurrentUserRole(effectiveRole);
    setIsAuthenticated(true);
    setSelectedEmployee(effectiveRole === 'employee' ? userObj : null);
    setIsProfileViewOnly(false);

    saveAuthSession({
      isAuthenticated: true,
      currentEmployee: userObj,
      currentUserRole: effectiveRole
    });
  };

  const handleSignOut = () => {
    clearAuthSession();
    setIsAuthenticated(false);
    setCurrentEmployee(null);
    setSelectedEmployee(null);
  };

  const handleRoleToggle = (newRole) => {
    setCurrentUserRole(newRole);
    if (newRole === 'employee') {
      setSelectedEmployee(currentEmployee);
      setIsProfileViewOnly(false);
    } else {
      setSelectedEmployee(null);
    }
  };

  const handleSelectEmployee = (emp, isViewOnly = true) => {
    setSelectedEmployee(emp);
    setIsProfileViewOnly(isViewOnly);
    setActiveTab('employees');
  };

  const handleOpenMyProfile = () => {
    setSelectedEmployee(currentEmployee);
    setIsProfileViewOnly(false); // Form view as requested by rule 4
    setActiveTab('employees');
  };

  const handleCheckInToggle = (newCheckedInState) => {
    setIsCheckedIn(newCheckedInState);
    if (newCheckedInState) {
      setCheckInTime(new Date().toISOString());
    }

    const updatedStatus = newCheckedInState ? 'present' : 'absent';
    setEmployees(prev => prev.map(e => e.id === currentEmployee?.id ? { ...e, status: updatedStatus } : e));

    const todayStr = new Date().toISOString().split('T')[0];
    const newLog = {
      date: todayStr,
      employeeId: currentEmployee?.id || 'EMP-101',
      employeeName: currentEmployee?.name || 'User',
      checkIn: newCheckedInState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--',
      checkOut: newCheckedInState ? 'In Progress' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      workHours: newCheckedInState ? '0h 01m' : '8h 30m',
      extraHours: '0h 0m',
      status: newCheckedInState ? 'Present' : 'Absent'
    };
    setAttendanceLogs(prev => [newLog, ...prev]);
  };

  const handleAddEmployee = (newEmp) => {
    setEmployees(prev => [newEmp, ...prev]);
  };

  const handleUpdateEmployee = (updatedEmp) => {
    setEmployees(prev => prev.map(e => e.id === updatedEmp.id ? updatedEmp : e));
    if (selectedEmployee?.id === updatedEmp.id) {
      setSelectedEmployee(updatedEmp);
    }
    if (currentEmployee?.id === updatedEmp.id) {
      setCurrentEmployee(updatedEmp);
    }
  };

  const handleApplyLeave = (newLeaveReq) => {
    setLeaveRequests(prev => [newLeaveReq, ...prev]);
  };

  const handleUpdateLeaveStatus = (reqId, newStatus, hrComments) => {
    setLeaveRequests(prev => prev.map(req => {
      if (req.id === reqId) {
        return { ...req, status: newStatus, hrComments };
      }
      return req;
    }));
  };

  const handleUpdatePerformance = (updatedPerf) => {
    setPerformanceData(prev => {
      const exists = prev.some(p => p.employeeId === updatedPerf.employeeId);
      if (exists) {
        return prev.map(p => p.employeeId === updatedPerf.employeeId ? updatedPerf : p);
      }
      return [...prev, updatedPerf];
    });
  };

  const handleOpenPayslip = (emp) => {
    setPayslipEmployee(emp);
    setShowPayslipModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      
      {!isAuthenticated && (
        <AuthModal
          isOpen={!isAuthenticated}
          employees={employees}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (currentUserRole === 'admin') setSelectedEmployee(null);
        }}
        currentUserRole={currentUserRole}
        setCurrentUserRole={handleRoleToggle}
        currentEmployee={currentEmployee}
        isCheckedIn={isCheckedIn}
        checkInTime={checkInTime}
        onCheckInToggle={handleCheckInToggle}
        onSignOut={handleSignOut}
        onOpenMyProfile={handleOpenMyProfile}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-4">
        
        {currentUserRole === 'admin' && selectedEmployee && activeTab === 'employees' && (
          <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl shadow-xs text-xs">
            <button
              onClick={() => setSelectedEmployee(null)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition-colors"
            >
              ← Back to Employee Directory
            </button>
            <div className="flex items-center space-x-2 font-mono">
              <span className="text-slate-500">Viewing:</span>
              <strong className="text-slate-900 font-sans font-bold">{selectedEmployee.name}</strong>
              <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${isProfileViewOnly ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                {isProfileViewOnly ? 'View-Only Mode' : 'Form View Mode'}
              </span>
            </div>
          </div>
        )}

        {currentUserRole === 'employee' && (
          <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-500 font-medium">Logged in User:</span>
              <strong className="text-slate-900 font-bold">{currentEmployee?.name}</strong>
              <span className="text-[11px] text-sky-700 font-mono">({currentEmployee?.email})</span>
            </div>
            <span className="text-[11px] text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md font-mono font-bold">
              ID: {currentEmployee?.id}
            </span>
          </div>
        )}

        {activeTab === 'employees' && (
          currentUserRole === 'employee' ? (
            <ProfileView
              employee={currentEmployee}
              allEmployees={employees}
              onSelectEmployee={handleSelectEmployee}
              currentUserRole={currentUserRole}
              onUpdateEmployee={handleUpdateEmployee}
              onOpenPayslip={handleOpenPayslip}
              isViewOnly={false} // "My Profile" form view
            />
          ) : selectedEmployee ? (
            <ProfileView
              employee={selectedEmployee}
              allEmployees={employees}
              onSelectEmployee={handleSelectEmployee}
              currentUserRole={currentUserRole}
              onUpdateEmployee={handleUpdateEmployee}
              onOpenPayslip={handleOpenPayslip}
              isViewOnly={isProfileViewOnly}
            />
          ) : (
            <EmployeeDirectory
              employees={employees}
              onSelectEmployee={handleSelectEmployee}
              currentUserRole={currentUserRole}
              onAddEmployee={handleAddEmployee}
            />
          )
        )}

        {activeTab === 'attendance' && (
          <AttendanceView
            attendanceLogs={attendanceLogs}
            currentUserRole={currentUserRole}
            currentEmployee={currentEmployee}
            employees={employees}
          />
        )}

        {activeTab === 'timeoff' && (
          <LeaveView
            leaveRequests={leaveRequests}
            currentUserRole={currentUserRole}
            currentEmployee={currentEmployee}
            employees={employees}
            onApplyLeave={handleApplyLeave}
            onUpdateLeaveStatus={handleUpdateLeaveStatus}
          />
        )}

        {activeTab === 'payroll' && (
          <PayrollView
            employees={employees}
            currentUserRole={currentUserRole}
            currentEmployee={currentEmployee}
            onOpenPayslip={handleOpenPayslip}
            onUpdateEmployee={handleUpdateEmployee}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            employees={employees}
            attendanceLogs={attendanceLogs}
            leaveRequests={leaveRequests}
          />
        )}

      </main>

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-800">Dayflow HRMS</p>
        <p>Every workday, perfectly aligned. Built with React & Tailwind CSS.</p>
      </footer>

      <PayslipModal
        isOpen={showPayslipModal}
        onClose={() => setShowPayslipModal(false)}
        employee={payslipEmployee}
      />
    </div>
  );
}
