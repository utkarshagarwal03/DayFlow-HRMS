import React, { useState } from 'react';
import { Plus, Search, Calendar, Check, X, Paperclip, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import LeaveModal from './LeaveModal';
import { PUBLIC_HOLIDAYS_2026 } from '../data/mockData';

export default function LeaveView({ 
  leaveRequests, 
  currentUserRole, 
  currentEmployee,
  employees,
  onApplyLeave,
  onUpdateLeaveStatus 
}) {
  const [activeSubTab, setActiveSubTab] = useState('timeoff');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRequestData, setSelectedRequestData] = useState(null);

  const handleCellClick = (monthName, dayNum) => {
    const monthMap = {
      'January 2026': '2026-01',
      'February 2026': '2026-02',
      'March 2026': '2026-03',
      'April 2026': '2026-04',
      'May 2026': '2026-05',
      'June 2026': '2026-06',
      'July 2026': '2026-07',
      'August 2026': '2026-08',
      'September 2026': '2026-09',
      'October 2026': '2026-10',
      'November 2026': '2026-11',
      'December 2026': '2026-12'
    };

    const prefix = monthMap[monthName] || '2026-05';
    const isoDate = `${prefix}-${String(dayNum).padStart(2, '0')}`;

    // Find existing leave request for this date
    const existingReq = leaveRequests.find(req => {
      const isUserMatch = req.employeeId === currentEmployee?.id || currentUserRole === 'admin';
      return isUserMatch && (isoDate >= req.startDate && isoDate <= req.endDate);
    });

    if (existingReq) {
      setSelectedRequestData(existingReq);
      setSelectedDate(null);
    } else {
      setSelectedRequestData(null);
      setSelectedDate(isoDate);
    }
    setShowModal(true);
  };

  const handleNewClick = () => {
    setSelectedRequestData(null);
    setSelectedDate('2026-05-13');
    setShowModal(true);
  };

  const employeeRequests = leaveRequests.filter(
    r => r.employeeId === currentEmployee?.id
  );

  const filteredAdminRequests = leaveRequests.filter(
    r => r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const leaveBalance = currentEmployee?.leaveBalance || {
    paidLeaveDays: 24,
    paidLeaveUsed: 3,
    sickLeaveDays: 7,
    sickLeaveUsed: 1,
    unpaidLeaveDays: 0
  };

  const handleApprove = (reqId) => {
    onUpdateLeaveStatus(reqId, 'Approved', 'Approved by HR Manager');
  };

  const handleReject = (reqId) => {
    onUpdateLeaveStatus(reqId, 'Rejected', 'Rejected by HR Manager');
  };

  const monthsList = [
    'January 2026', 'February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026',
    'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'
  ];

  return (
    <div className="space-y-5">
      
      {/* SUB NAVIGATION HEADER (Matching Image 2 & 3 Wireframes) */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 pb-3">
          
          {/* Sub-nav Tabs: Time Off (Calendar View) & Approvals (Admin) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSubTab('timeoff')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'timeoff'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Time Off
            </button>

            {currentUserRole === 'admin' && (
              <button
                onClick={() => setActiveSubTab('approvals')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSubTab === 'approvals'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Approvals Ledger
              </button>
            )}
          </div>

          {/* Action Bar: NEW Button & Searchbar */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-extrabold flex items-center space-x-1.5 shadow-xs transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>NEW</span>
            </button>

            {currentUserRole === 'admin' && activeSubTab === 'approvals' && (
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Searchbar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY BALANCE CARDS (Image 1 Wireframe) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
          
          <div className="bg-sky-50/70 border border-sky-150 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-sky-800 font-bold block text-sm">Paid time off</span>
              <span className="text-xs text-sky-600 font-medium">Annual Allocated Vacation</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-sky-900">
                24 Days Available
              </span>
              <span className="text-[11px] text-sky-600 block">Out of 24 total days</span>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-150 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-emerald-800 font-bold block text-sm">Sick time off</span>
              <span className="text-xs text-emerald-600 font-medium">Medical & Emergency Leave</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-emerald-900">
                07 Days Available
              </span>
              <span className="text-[11px] text-emerald-600 block">Out of 07 total days</span>
            </div>
          </div>

        </div>
      </div>

      {/* ADMIN APPROVALS LEDGER VIEW */}
      {currentUserRole === 'admin' && activeSubTab === 'approvals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Table (2 Cols wide) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 font-bold text-xs text-slate-800 flex justify-between">
              <span>Time Off Approvals Ledger</span>
              <span className="font-mono text-sky-700">{filteredAdminRequests.length} Requests</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Start Date</th>
                    <th className="py-3 px-4">End Date</th>
                    <th className="py-3 px-4">Time off Type</th>
                    <th className="py-3 px-4 text-center">Status / Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                  {filteredAdminRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-sky-50/40 transition-colors">
                      <td className="py-3 px-4 font-sans">
                        <span className="font-bold text-slate-900 block">[{req.employeeName}]</span>
                        <span className="text-[10px] text-sky-700 font-mono">{req.employeeId}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-800">{req.startDate}</td>
                      <td className="py-3 px-4 text-slate-800">{req.endDate}</td>
                      <td className="py-3 px-4 font-sans">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-semibold">
                          {req.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-sans">
                        {req.status === 'Pending' ? (
                          <div className="flex items-center justify-center space-x-2">
                            {/* Reject Button (Red) */}
                            <button
                              onClick={() => handleReject(req.id)}
                              title="Reject Request"
                              className="h-7 w-7 rounded-md bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-2xs"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {/* Approve Button (Green) */}
                            <button
                              onClick={() => handleApprove(req.id)}
                              title="Approve Request"
                              className="h-7 w-7 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-2xs"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                            req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {req.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note Box (Matching Image 2 Wireframe Note Card) */}
          <div className="bg-sky-50/50 border-2 border-dashed border-sky-200 p-5 rounded-2xl space-y-4 h-fit">
            <div className="flex items-center space-x-2 text-sky-900 border-b border-sky-200 pb-3">
              <Info className="h-5 w-5 text-sky-600" />
              <h3 className="font-extrabold text-base tracking-tight">Note</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Employees can view only their own time off records, while Admins and HR Officers can view time off records & approve/reject them for all employees.
            </p>
            <div className="pt-2 text-[11px] text-sky-800 font-mono bg-white p-3 rounded-lg border border-sky-100 space-y-1">
              <p><strong>System Rule:</strong> Approved time off automatically marks attendance status as "On Leave" on corresponding workdays.</p>
            </div>
          </div>

        </div>
      )}

      {/* EMPLOYEE VIEW: CALENDAR GRID & RIGHT SIDEBAR (Matching Image 1 Wireframe) */}
      {(currentUserRole === 'employee' || activeSubTab === 'timeoff') && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          
          {/* Main 12-Month Calendar Grid (3 Cols Wide) */}
          <div className="lg:col-span-3 bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-sky-600" />
                <span>2026 Year-at-a-Glance Time Off Calendar</span>
              </h2>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
                FY 2026-2027 Cycle
              </span>
            </div>

            {/* Grid of 12 Months with Mini S M T W T F S Headers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {[
                { name: 'January 2026', days: 31, startDay: 4 },
                { name: 'February 2026', days: 28, startDay: 0 },
                { name: 'March 2026', days: 31, startDay: 0 },
                { name: 'April 2026', days: 30, startDay: 3 },
                { name: 'May 2026', days: 31, startDay: 5 },
                { name: 'June 2026', days: 30, startDay: 1 },
                { name: 'July 2026', days: 31, startDay: 3 },
                { name: 'August 2026', days: 31, startDay: 6 },
                { name: 'September 2026', days: 30, startDay: 2 },
                { name: 'October 2026', days: 31, startDay: 4 },
                { name: 'November 2026', days: 30, startDay: 0 },
                { name: 'December 2026', days: 31, startDay: 2 }
              ].map((month, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg space-y-1.5 hover:border-purple-300 transition-colors">
                  <span className="font-extrabold text-slate-800 text-[11px] block text-center border-b border-slate-200 pb-1">
                    {month.name}
                  </span>
                  
                  {/* S M T W T F S Day Header */}
                  <div className="grid grid-cols-7 text-[9px] font-bold text-slate-400 text-center">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>

                  {/* Day Cells Grid */}
                  <div className="grid grid-cols-7 text-[9px] font-mono text-center gap-0.5">
                    {Array.from({ length: month.startDay }).map((_, i) => (
                      <span key={`empty-${i}`} className="p-0.5" />
                    ))}
                    {Array.from({ length: month.days }).map((_, d) => {
                      const dayNum = d + 1;
                      // Highlight leaves or holidays
                      const isLeaveDay = (month.name === 'May 2026' && (dayNum === 13 || dayNum === 14)) || (month.name === 'August 2026' && dayNum === 22);
                      const isHoliday = (month.name === 'August 2026' && (dayNum === 15 || dayNum === 28)) || (month.name === 'January 2026' && dayNum === 26);
                      
                      return (
                        <button 
                          key={dayNum} 
                          onClick={() => handleCellClick(month.name, dayNum)}
                          title={`Click date (${dayNum} ${month.name}) to view or request Time Off`}
                          className={`p-0.5 rounded font-semibold transition-all cursor-pointer ${
                            isLeaveDay ? 'bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-2xs' :
                            isHoliday ? 'bg-sky-200 text-sky-900 font-bold hover:bg-sky-300' :
                            'text-slate-700 hover:bg-purple-100 hover:text-purple-900 font-bold'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* My Submissions Table */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-800 text-xs">My Time Off Submissions</h3>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Req ID</th>
                      <th className="py-2.5 px-3">Time Off Type</th>
                      <th className="py-2.5 px-3">Validity Period</th>
                      <th className="py-2.5 px-3">Allocation Days</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                    {employeeRequests.map((req) => (
                      <tr 
                        key={req.id} 
                        onClick={() => {
                          setSelectedRequestData(req);
                          setSelectedDate(null);
                          setShowModal(true);
                        }}
                        title="Click to view details of this time off request"
                        className="hover:bg-purple-50/60 cursor-pointer transition-colors"
                      >
                        <td className="py-2.5 px-3 text-slate-500 font-semibold">{req.id}</td>
                        <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{req.type}</td>
                        <td className="py-2.5 px-3 text-slate-700">{req.startDate} to {req.endDate}</td>
                        <td className="py-2.5 px-3 font-bold text-purple-700">{req.totalDays}.00 Days</td>
                        <td className="py-2.5 px-3 font-sans">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            req.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Sidebar: Legend & Public Holidays Panel (Matching Image 1 Wireframe) */}
          <div className="space-y-4">
            
            {/* Legend Box */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs tracking-wide uppercase border-b border-slate-100 pb-2">
                Legend
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2.5">
                  <span className="h-3.5 w-3.5 rounded bg-purple-600 inline-block shadow-2xs" />
                  <span className="font-semibold text-slate-700">Validated</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="h-3.5 w-3.5 rounded bg-amber-500 inline-block shadow-2xs border border-amber-600" />
                  <span className="font-semibold text-slate-700">To Approve</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="h-0.5 w-4 bg-rose-600 inline-block" />
                  <span className="font-semibold text-slate-700">Refused</span>
                </div>
              </div>
            </div>

            {/* Public Holidays List Box (Image 1 Wireframe Sidebar) */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs tracking-wide uppercase border-b border-slate-100 pb-2">
                Public Holidays
              </h3>
              <div className="space-y-2.5 text-[11px] font-sans">
                {PUBLIC_HOLIDAYS_2026.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                    <span className="font-mono text-sky-800 font-bold">{h.date} :</span>
                    <span className="font-bold text-slate-700 text-right">{h.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Modal (Matching Image 3 Modal Wireframe) */}
      <LeaveModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        employees={employees} 
        currentEmployee={currentEmployee} 
        initialData={selectedRequestData}
        selectedDate={selectedDate}
        onApplyLeave={onApplyLeave} 
      />

    </div>
  );
}

