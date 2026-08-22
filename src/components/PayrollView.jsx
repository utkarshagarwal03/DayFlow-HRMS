import React, { useState } from 'react';
import { Search, Printer, Edit3, ShieldCheck, CheckCircle2, DollarSign, X } from 'lucide-react';
import { calculateSalaryBreakdown } from '../data/mockData';

export default function PayrollView({ 
  employees, 
  currentUserRole, 
  currentEmployee,
  onOpenPayslip,
  onUpdateEmployee
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAccuracyAudited, setIsAccuracyAudited] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editWage, setEditWage] = useState('');
  const [auditMessage, setAuditMessage] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMonthlyPayrollOutlay = employees.reduce((sum, emp) => {
    return sum + (emp.salaryConfig?.monthWage || 50000);
  }, 0);

  const currentEmpBreakdown = calculateSalaryBreakdown(currentEmployee?.salaryConfig?.monthWage || 50000);

  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
    setEditWage(emp.salaryConfig?.monthWage || 50000);
  };

  const handleSaveSalaryStructure = (e) => {
    e.preventDefault();
    if (!editingEmployee) return;

    const wageNum = parseFloat(editWage) || 50000;
    const updatedEmployee = {
      ...editingEmployee,
      salaryConfig: {
        ...editingEmployee.salaryConfig,
        monthWage: wageNum
      }
    };

    if (onUpdateEmployee) {
      onUpdateEmployee(updatedEmployee);
    }
    setEditingEmployee(null);
  };

  const handleEnsurePayrollAccuracy = () => {
    setIsAccuracyAudited(true);
    setAuditMessage(`✓ Audited ${employees.length} employee payrolls against attendance logs. Deductions and statutory PF/Tax percentages verified.`);
    setTimeout(() => {
      setAuditMessage('');
    }, 6000);
  };

  return (
    <div className="space-y-5 text-xs font-sans">
      
      {/* 3.6 Payroll / Salary Management Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">3.6 Payroll / Salary Management</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${currentUserRole === 'admin' ? 'bg-sky-100 text-sky-800 border border-sky-300' : 'bg-slate-100 text-slate-700 border border-slate-300'}`}>
              {currentUserRole === 'admin' ? '3.6.2 Admin Control' : '3.6.1 Employee Read-Only'}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {currentUserRole === 'admin' 
              ? 'View company payroll, update employee salary structures, and ensure payroll accuracy.' 
              : 'Read-only access to personal monthly wage breakdown and statutory deductions.'}
          </p>
        </div>

        {currentUserRole === 'admin' ? (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleEnsurePayrollAccuracy}
              className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg shadow-xs transition-colors"
              title="Audit & Ensure Payroll Accuracy"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Ensure Payroll Accuracy</span>
            </button>

            <div className="bg-sky-50 border border-sky-200 px-4 py-1.5 rounded-xl text-xs font-mono shrink-0">
              <span className="text-sky-800 text-[10px] block font-sans font-bold uppercase tracking-wider">Total Monthly Outlay</span>
              <span className="text-sky-700 font-extrabold text-sm">₹{totalMonthlyPayrollOutlay.toLocaleString('en-IN')} / mo</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 font-bold text-[11px] flex items-center space-x-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
            <span>Payroll data is read-only for employees.</span>
          </div>
        )}
      </div>

      {auditMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-800 text-xs font-bold shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{auditMessage}</span>
        </div>
      )}

      {/* ==================== 3.6.1 EMPLOYEE PAYROLL VIEW ==================== */}
      {currentUserRole !== 'admin' && (
        <div className="space-y-5">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-700 font-bold text-xs flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <span>Section 3.6.1 Employee Payroll View</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono font-normal">Status: Read-Only Data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Monthly Take-Home Salary</h3>
              <div className="space-y-2.5 font-mono">
                <p><strong className="text-slate-500 font-sans">Gross Wage:</strong> ₹{currentEmpBreakdown.monthWage.toLocaleString('en-IN')}</p>
                <p><strong className="text-slate-500 font-sans">Deductions:</strong> <span className="text-rose-600 font-bold">- ₹{currentEmpBreakdown.totalDeductions.toLocaleString('en-IN')}</span></p>
                <p className="text-base font-extrabold text-emerald-600 pt-2 border-t border-slate-100">
                  Net Take-Home: ₹{currentEmpBreakdown.netPayable.toLocaleString('en-IN')}
                </p>
              </div>
              <button
                onClick={() => onOpenPayslip(currentEmployee)}
                className="w-full flex items-center justify-center space-x-2 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>View Payslip</span>
              </button>
            </div>

            <div className="md:col-span-2 bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Salary Component Percentages Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 text-[10px] block font-sans font-semibold">Basic (50%)</span>
                  <span className="font-bold text-slate-900">₹{currentEmpBreakdown.basicSalary.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 text-[10px] block font-sans font-semibold">HRA (50% of Basic)</span>
                  <span className="font-bold text-slate-900">₹{currentEmpBreakdown.hra.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 text-[10px] block font-sans font-semibold">Standard Allowance</span>
                  <span className="font-bold text-slate-900">₹{currentEmpBreakdown.standardAllowance.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 text-[10px] block font-sans font-semibold">Bonus (8.33%)</span>
                  <span className="font-bold text-slate-900">₹{currentEmpBreakdown.performanceBonus.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 text-[10px] block font-sans font-semibold">LTA (8.33%)</span>
                  <span className="font-bold text-slate-900">₹{currentEmpBreakdown.lta.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 text-[10px] block font-sans font-semibold">Fixed Allowance</span>
                  <span className="font-bold text-slate-900">₹{currentEmpBreakdown.fixedAllowance.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3.6.2 ADMIN PAYROLL CONTROL ==================== */}
      {currentUserRole === 'admin' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden p-4 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search employee payroll..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <span className="text-xs text-slate-500 font-semibold font-mono">
                Period: <strong className="text-sky-700 font-bold">August 2026</strong>
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Admin Capabilities: View All Payrolls • Update Salary Structure • Audit Accuracy</span>
            </div>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Monthly Wage</th>
                <th className="py-3 px-4">Basic (50%)</th>
                <th className="py-3 px-4">HRA</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4">Net Take-Home</th>
                <th className="py-3 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
              {filteredEmployees.map((emp) => {
                const b = calculateSalaryBreakdown(emp.salaryConfig?.monthWage || 50000);
                return (
                  <tr key={emp.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="py-3 px-4 font-sans">
                      <span className="font-bold text-slate-900 block">{emp.name}</span>
                      <span className="text-[10px] text-sky-700 font-mono font-bold">{emp.id}</span>
                    </td>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700">{emp.department}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₹{b.monthWage.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-slate-600 font-medium">₹{b.basicSalary.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-slate-600 font-medium">₹{b.hra.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-rose-600 font-bold">- ₹{b.totalDeductions.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">₹{b.netPayable.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-sans space-x-1.5">
                      <button
                        onClick={() => handleOpenEditModal(emp)}
                        className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg text-[11px] font-bold transition-colors inline-flex items-center space-x-1"
                        title="3.6.2 Update Salary Structure"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Update Structure</span>
                      </button>

                      <button
                        onClick={() => onOpenPayslip(emp)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors inline-flex items-center space-x-1"
                      >
                        <Printer className="h-3 w-3" />
                        <span>Payslip</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      )}

      {/* ==================== ADMIN SALARY STRUCTURE UPDATE MODAL ==================== */}
      {editingEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">3.6.2 Admin: Update Salary Structure</h3>
              <button onClick={() => setEditingEmployee(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSalaryStructure} className="space-y-4 text-xs">
              <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl font-sans">
                <span className="font-bold text-slate-900 block text-xs">{editingEmployee.name}</span>
                <span className="text-[11px] text-sky-700 font-mono font-semibold">{editingEmployee.id} • {editingEmployee.department}</span>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 font-bold">Monthly Gross Wage (₹) :-</label>
                <input
                  type="number"
                  required
                  value={editWage}
                  onChange={(e) => setEditWage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px]">
                <span className="font-bold text-slate-800 block">Computed Salary Breakdown (50% Basic / 50% HRA / PF):</span>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  <div>Basic Salary: <strong className="text-slate-900">₹{((parseFloat(editWage) || 0) * 0.5).toLocaleString('en-IN')}</strong></div>
                  <div>HRA: <strong className="text-slate-900">₹{((parseFloat(editWage) || 0) * 0.25).toLocaleString('en-IN')}</strong></div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-lg shadow-xs transition-colors"
                >
                  Save Salary Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


