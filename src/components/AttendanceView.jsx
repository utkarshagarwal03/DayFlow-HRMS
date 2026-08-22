import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function AttendanceView({ 
  attendanceLogs = [], 
  currentUserRole = 'admin', 
  currentEmployee,
  employees = []
}) {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [selectedDate, setSelectedDate] = useState('2026-08-22');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('Day'); // Day / Month

  // Filter logs for employee personal history vs admin current day view
  const employeePersonalLogs = attendanceLogs.filter(log => log.employeeId === currentEmployee?.id);

  const adminTodayLogs = attendanceLogs.filter(log => {
    const matchesSearch = log.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handlePrevDate = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDate = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  // Format date nicely for table section banner (e.g. "22, August 2026")
  const formattedBannerDate = React.useMemo(() => {
    try {
      const [year, month, day] = selectedDate.split('-');
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthIndex = parseInt(month, 10) - 1;
      return `${day}, ${monthNames[monthIndex]} ${year}`;
    } catch {
      return '22, August 2026';
    }
  }, [selectedDate]);

  // Metrics for Employee View
  const totalWorkingDays = 23;
  const presentDays = employeePersonalLogs.filter(l => l.status === 'Present').length || 21;
  const leavesCount = employeePersonalLogs.filter(l => l.status === 'On Leave').length || 2;

  return (
    <div className="space-y-5 text-xs font-sans">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-xs gap-3">
        <div>
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Clock className="h-5 w-5 text-sky-600" />
            <span>{currentUserRole === 'admin' ? 'Attendances List View (For Admin/HR Officer)' : 'Attendance (Day-wise Personal Ledger)'}</span>
          </h1>
          <p className="text-xs text-slate-500">
            {currentUserRole === 'admin' 
              ? 'Real-time overview of all employees present on the selected work day.'
              : 'Day-wise attendance tracking for ongoing month, displaying working time including break hours.'}
          </p>
        </div>

        {/* Note indicator badge */}
        <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-[11px] font-bold font-mono">
          📌 Basis for Payslip Computation
        </span>
      </div>

      {/* ADMIN CONTROLS BAR (Searchbar, Date Nav, Day Toggle) */}
      {currentUserRole === 'admin' ? (
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Searchbar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Searchbar (Search employee by name or ID)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Date Navigator Controls (<- -> Date v Day) */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 p-1 rounded-lg">
                <button onClick={handlePrevDate} className="p-1 hover:bg-white rounded text-slate-700 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={handleNextDate} className="p-1 hover:bg-white rounded text-slate-700 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
              >
                <option value="2026-08-22">Date v (22, August 2026)</option>
                <option value="2026-08-21">21, August 2026</option>
                <option value="2026-08-20">20, August 2026</option>
              </select>

              <button
                onClick={() => setViewMode(viewMode === 'Day' ? 'Month' : 'Day')}
                className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                {viewMode} View Mode
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* EMPLOYEE CONTROLS BAR (<- -> Aug 2026 v | Count of days present | Leaves count | Total working days) */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Month Navigator (<- -> Aug 2026 v) */}
          <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 p-1 rounded-lg">
              <button onClick={handlePrevDate} className="p-1 hover:bg-white rounded text-slate-700">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={handleNextDate} className="p-1 hover:bg-white rounded text-slate-700">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 bg-sky-50 border border-sky-200 text-sky-800 font-bold rounded-lg text-xs"
            >
              <option value="August 2026">Aug 2026</option>
              <option value="July 2026">Jul 2026</option>
              <option value="June 2026">Jun 2026</option>
            </select>
          </div>

          {/* Count of days present */}
          <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs space-y-0.5 border-l-4 border-l-emerald-500">
            <span className="text-slate-500 font-semibold block text-[11px]">Count of days present</span>
            <span className="text-xl font-bold font-mono text-emerald-600">{presentDays} Days</span>
          </div>

          {/* Leaves count */}
          <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs space-y-0.5 border-l-4 border-l-sky-500">
            <span className="text-slate-500 font-semibold block text-[11px]">Leaves count</span>
            <span className="text-xl font-bold font-mono text-sky-600">{leavesCount} Days</span>
          </div>

          {/* Total working days */}
          <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs space-y-0.5 border-l-4 border-l-slate-400">
            <span className="text-slate-500 font-semibold block text-[11px]">Total working days</span>
            <span className="text-xl font-bold font-mono text-slate-900">{totalWorkingDays} Days</span>
          </div>

        </div>
      )}

      {/* ATTENDANCE TABLE CARD */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        
        {/* Dynamic Date Section Header Bar (Synchronized with selectedDate) */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 font-extrabold text-slate-800 text-xs tracking-wider">
          {formattedBannerDate}
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                {currentUserRole === 'admin' ? (
                  <th className="py-3 px-4">Emp</th>
                ) : (
                  <th className="py-3 px-4">Date</th>
                )}
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Work Hours</th>
                <th className="py-3 px-4">Extra Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
              {(currentUserRole === 'admin' ? adminTodayLogs : employeePersonalLogs).map((log, idx) => (
                <tr key={idx} className="hover:bg-sky-50/50 transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">
                    {currentUserRole === 'admin' ? (
                      <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>[{log.employeeName}]</span>
                        <span className="text-[10px] text-slate-400 font-mono">({log.employeeId})</span>
                      </div>
                    ) : (
                      <span>{log.date || '28/10/2025'}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold">{log.checkIn || '10:00'}</td>
                  <td className="py-3 px-4 font-semibold">{log.checkOut || '19:00'}</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">{log.workHours || '09:00'}</td>
                  <td className="py-3 px-4 text-amber-600 font-semibold">{log.extraHours || '01:00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note on Payslip Impact */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 text-[11px] text-slate-600 flex items-center justify-between">
          <span className="italic">
            💡 Attendance data automatically calculates payable days. Missing punches or unpaid leave reduce payable days during monthly payslip computation.
          </span>
          <span className="font-bold text-slate-800 font-mono">
            Showing {(currentUserRole === 'admin' ? adminTodayLogs : employeePersonalLogs).length} Records
          </span>
        </div>

      </div>

    </div>
  );
}


