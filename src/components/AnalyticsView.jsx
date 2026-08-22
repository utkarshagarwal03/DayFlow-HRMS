import React, { useState } from 'react';
import { Download, FileSpreadsheet, ArrowUpRight } from 'lucide-react';

export default function AnalyticsView({ employees, attendanceLogs, leaveRequests }) {
  const [timeRange, setTimeRange] = useState('august_2026');

  const totalEmployees = employees.length;
  const presentCount = employees.filter(e => e.status === 'present').length;
  const leaveCount = employees.filter(e => e.status === 'on_leave').length;
  const absentCount = employees.filter(e => e.status === 'absent').length;

  const attendancePercentage = Math.round((presentCount / totalEmployees) * 100);

  const totalPayrollOutlay = employees.reduce((acc, emp) => {
    return acc + (emp.salaryConfig?.monthWage || 50000);
  }, 0);

  const totalLeaveApproved = leaveRequests.filter(r => r.status === 'Approved').length;
  const totalLeavePending = leaveRequests.filter(r => r.status === 'Pending').length;

  const deptStats = [
    { name: 'Engineering', count: 2, outlay: 150000, percent: 36.5 },
    { name: 'Human Resources', count: 1, outlay: 120000, percent: 29.2 },
    { name: 'Infrastructure', count: 1, outlay: 75000, percent: 18.3 },
    { name: 'Product Design', count: 1, outlay: 65000, percent: 16.0 }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Total Employees,${totalEmployees}\n`
      + `Present Rate,${attendancePercentage}%\n`
      + `Monthly Payroll Outlay,₹${totalPayrollOutlay}\n`
      + `Approved Leaves,${totalLeaveApproved}\n`
      + `Pending Leaves,${totalLeavePending}\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Dayflow_HR_Analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Workforce Analytics & Telemetry</h2>
          <p className="text-xs text-slate-500 font-medium">Headcount, attendance compliance, leave metrics, and payroll outlay.</p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
          >
            <option value="august_2026">August 2026</option>
            <option value="july_2026">July 2026</option>
            <option value="q3_2026">Q3 2026 Summary</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">Active Staff Headcount</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black font-mono text-slate-900">{totalEmployees}</span>
            <span className="text-xs text-emerald-700 font-bold font-mono bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">100% Active</span>
          </div>
          <span className="text-[11px] text-slate-500 block font-medium">Across 4 departments</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">Daily Attendance Rate</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black font-mono text-sky-600">{attendancePercentage}%</span>
            <span className="text-xs text-sky-700 font-bold font-mono bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">+2.4%</span>
          </div>
          <span className="text-[11px] text-slate-500 block font-medium">{presentCount} present, {leaveCount} on leave</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">Monthly Payroll Outlay</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-black font-mono text-slate-900">₹{totalPayrollOutlay.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[11px] text-slate-500 block font-medium">Avg CTC: ₹{Math.round(totalPayrollOutlay / totalEmployees).toLocaleString('en-IN')}</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-bold block">Pending Leave Queue</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black font-mono text-amber-600">{totalLeavePending}</span>
            <span className="text-xs text-slate-500 font-bold font-mono">{totalLeaveApproved} Approved</span>
          </div>
          <span className="text-[11px] text-slate-500 block font-medium">Awaiting HR Admin action</span>
        </div>

      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Department Outlay */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Department Payroll Allocation</h3>
          <div className="space-y-3.5">
            {deptStats.map((dept, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-bold">{dept.name} ({dept.count} Staff)</span>
                  <span className="font-mono text-sky-700 font-bold">₹{dept.outlay.toLocaleString('en-IN')} ({dept.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-sky-600 h-full rounded-full" style={{ width: `${dept.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Presence Breakdown */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Workforce Attendance Telemetry</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-800 font-bold">Checked In (Working)</span>
              <span className="font-mono text-emerald-700 font-bold">{presentCount} Employees ({attendancePercentage}%)</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-800 font-bold">On Approved Leave</span>
              <span className="font-mono text-sky-700 font-bold">{leaveCount} Employees</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-800 font-bold">Absent / Unscheduled</span>
              <span className="font-mono text-amber-700 font-bold">{absentCount} Employees</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

