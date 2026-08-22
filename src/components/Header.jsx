import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  CreditCard, 
  BarChart2, 
  ChevronDown, 
  LogOut, 
  User,
  CheckCircle,
  Briefcase,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  currentUserRole, 
  setCurrentUserRole,
  currentEmployee,
  onCheckInToggle,
  isCheckedIn,
  checkInTime,
  onSignOut,
  onOpenMyProfile
}) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isCheckedIn && checkInTime) {
      const updateTimer = () => {
        const diffMs = new Date() - new Date(checkInTime);
        setTimerSeconds(Math.floor(diffMs / 1000));
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else {
      setTimerSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime]);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleCheckIn = () => {
    const newStatus = !isCheckedIn;
    if (newStatus) {
      confetti({ particleCount: 50, spread: 40, origin: { y: 0.1 } });
    }
    onCheckInToggle(newStatus);
  };

  return (
    <header className="bg-white border-b border-slate-200 text-slate-700 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('employees')}>
          <img 
            src="/dayflow-logo.png" 
            alt="Dayflow Logo" 
            className="h-9 w-auto object-contain transition-transform hover:scale-105" 
          />
          <div className="flex items-center space-x-2">
            <span className="font-bold text-base text-slate-900 tracking-tight">Dayflow</span>
            <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-semibold font-mono">
              {currentUserRole === 'admin' ? 'HR ADMIN' : 'EMPLOYEE'}
            </span>
          </div>
        </div>

        {/* Primary Navigation Bar */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all flex items-center space-x-1.5 ${
              activeTab === 'employees'
                ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Employees</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all flex items-center space-x-1.5 ${
              activeTab === 'attendance'
                ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('timeoff')}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all flex items-center space-x-1.5 ${
              activeTab === 'timeoff'
                ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Time Off</span>
          </button>

          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all flex items-center space-x-1.5 ${
              activeTab === 'payroll'
                ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Payroll</span>
          </button>
        </nav>

        {/* Right Section: Check-In Widget, Role Switcher, Notifications, Profile Dropdown */}
        <div className="flex items-center space-x-3">
          
          {/* Systray Check In / Check Out Widget */}
          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 px-2.5 py-1 space-x-2 text-xs shadow-2xs">
            <button
              onClick={handleToggleCheckIn}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all shadow-xs ${
                isCheckedIn
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-sky-600 text-white hover:bg-sky-700'
              }`}
            >
              <span className={`h-2 w-2 rounded-full border border-white ${isCheckedIn ? 'bg-emerald-300' : 'bg-rose-400'}`} />
              <span>{isCheckedIn ? 'Checked In' : 'Check In ->'}</span>
            </button>

            {isCheckedIn ? (
              <span className="font-mono text-slate-700 font-medium text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                {formatTimer(timerSeconds)}
              </span>
            ) : (
              <span className="text-slate-500 font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                Since 00:00 PM
              </span>
            )}
          </div>

          {/* Quick Role Switcher (Allows Admins to switch view modes) */}
          {(currentEmployee?.role?.toLowerCase().includes('admin') || currentEmployee?.role?.toLowerCase().includes('vp') || currentUserRole === 'admin') ? (
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setCurrentUserRole('admin')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  currentUserRole === 'admin' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Admin Mode
              </button>
              <button
                onClick={() => setCurrentUserRole('employee')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  currentUserRole === 'employee' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Employee Mode
              </button>
            </div>
          ) : (
            <div className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 font-mono flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Employee Mode</span>
            </div>
          )}

          {/* User Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-1.5 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <img
                src={currentEmployee?.photo}
                alt={currentEmployee?.name}
                className="h-8 w-8 rounded-full object-cover border-2 border-sky-100"
              />
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-xs space-y-0.5">
                <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/50">
                  <p className="font-bold text-slate-900 truncate">{currentEmployee?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentEmployee?.email}</p>
                  <span className="text-[10px] text-sky-700 font-mono block mt-1 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100 w-fit font-semibold">
                    {currentUserRole === 'admin' ? 'HR Admin Privilege' : 'Employee Access'}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    if (onOpenMyProfile) onOpenMyProfile();
                  }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-sky-50 hover:text-sky-700 flex items-center space-x-2 font-medium transition-colors"
                >
                  <User className="h-4 w-4 text-sky-600" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    if (onSignOut) onSignOut();
                  }}
                  className="w-full text-left px-3.5 py-2 text-rose-600 hover:bg-rose-50 flex items-center space-x-2 font-medium transition-colors border-t border-slate-100"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}

