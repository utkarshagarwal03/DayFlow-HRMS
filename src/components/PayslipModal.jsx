import React from 'react';
import { X, Printer } from 'lucide-react';
import { calculateSalaryBreakdown } from '../data/mockData';

export default function PayslipModal({ isOpen, onClose, employee }) {
  if (!isOpen || !employee) return null;

  const breakdown = calculateSalaryBreakdown(employee.salaryConfig?.monthWage || 50000);
  const payPeriod = 'August 2026';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 flex items-start justify-center cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto cursor-default no-print relative"
      >
        
        {/* Modal Sticky Action Bar */}
        <div className="sticky top-0 z-20 p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
            <Printer className="h-4 w-4 text-sky-600" />
            <span>Salary Slip Preview - {payPeriod}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Export PDF</span>
            </button>
            <button 
              onClick={onClose} 
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-extrabold shadow-2xs transition-colors"
              title="Close Payslip Preview"
            >
              <X className="h-4 w-4 text-slate-700" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE SLIP CONTAINER */}
        <div id="printable-payslip" className="p-8 bg-white text-slate-900 space-y-6">
          
          {/* Company Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/dayflow-logo.png" 
                alt="Dayflow Technologies Logo" 
                className="h-11 w-auto object-contain" 
              />
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">DAYFLOW TECHNOLOGIES INC.</h1>
                <p className="text-xs text-slate-600">42 Enterprise Tech Park, HSR Layout, Bengaluru - 560102</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold bg-slate-100 text-slate-800 px-3 py-1 rounded border border-slate-300">
                PAYSLIP: {payPeriod.toUpperCase()}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">Generated: 22 August 2026</p>
            </div>
          </div>

          {/* Employee & Bank Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded border border-slate-200">
            <div className="space-y-1">
              <p><strong className="text-slate-700">Employee Name:</strong> {employee.name}</p>
              <p><strong className="text-slate-700">Employee ID:</strong> {employee.id}</p>
              <p><strong className="text-slate-700">Designation:</strong> {employee.role}</p>
              <p><strong className="text-slate-700">Department:</strong> {employee.department}</p>
              <p><strong className="text-slate-700">Date of Joining:</strong> {employee.dateOfJoining}</p>
            </div>
            <div className="space-y-1">
              <p><strong className="text-slate-700">Bank Name:</strong> {employee.bankDetails?.bankName}</p>
              <p><strong className="text-slate-700">A/C Number:</strong> {employee.bankDetails?.accountNumber}</p>
              <p><strong className="text-slate-700">IFSC Code:</strong> {employee.bankDetails?.ifscCode}</p>
              <p><strong className="text-slate-700">PAN Number:</strong> {employee.bankDetails?.panNo}</p>
              <p><strong className="text-slate-700">UAN Number:</strong> {employee.bankDetails?.uanNo}</p>
            </div>
          </div>

          {/* Attendance & Payable Days Telemetry Banner */}
          <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-lg flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-extrabold text-sky-900 block">📊 Attendance & Payable Days Computation</span>
              <p className="text-[11px] text-sky-700">
                Total Month Days: <strong>23</strong> | Present: <strong>21</strong> | Paid Leave: <strong>1</strong> | Unpaid/Missing: <strong className="text-rose-600">1 Day</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-sky-800 tracking-wider block">Payable Days Calculated</span>
              <span className="font-mono font-black text-sky-900 text-sm bg-white px-2.5 py-0.5 rounded border border-sky-300">
                22.0 / 23 Days
              </span>
            </div>
          </div>

          {/* Earnings & Deductions Dual Table */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            
            {/* Earnings */}
            <div className="border border-slate-300 rounded overflow-hidden">
              <div className="bg-slate-100 p-2 font-bold text-slate-800 border-b border-slate-300">
                EARNINGS (COMPONENTS)
              </div>
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-200 font-mono">
                  <tr>
                    <td className="p-2 font-sans">Basic Salary (50%)</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.basicSalary.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans">HRA (50% of Basic)</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.hra.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans">Standard Allowance</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.standardAllowance.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans">Performance Bonus</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.performanceBonus.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans">Leave Travel Allowance (LTA)</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.lta.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans">Fixed Allowance</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.fixedAllowance.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold font-sans">
                    <td className="p-2">Gross Base Earnings</td>
                    <td className="p-2 text-right font-mono text-emerald-700">₹{breakdown.monthWage.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions */}
            <div className="border border-slate-300 rounded overflow-hidden">
              <div className="bg-slate-100 p-2 font-bold text-slate-800 border-b border-slate-300">
                DEDUCTIONS (STATUTORY & ATTENDANCE)
              </div>
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-200 font-mono">
                  <tr>
                    <td className="p-2 font-sans">PF Employee Contribution</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.pfEmployee.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans">Professional Tax</td>
                    <td className="p-2 text-right font-semibold">₹{breakdown.professionalTax.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-rose-50/60 font-sans text-rose-900 font-semibold">
                    <td className="p-2">Loss of Pay (1 Unpaid/Missing Day)</td>
                    <td className="p-2 text-right font-mono text-rose-700 font-bold">
                      ₹{Math.round(breakdown.monthWage / 23).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 text-slate-400 font-sans">Employer PF Contribution (Info)</td>
                    <td className="p-2 text-right text-slate-400">₹{breakdown.pfEmployer.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold font-sans">
                    <td className="p-2">Total Deductions</td>
                    <td className="p-2 text-right font-mono text-rose-700">
                      ₹{(breakdown.totalDeductions + Math.round(breakdown.monthWage / 23)).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Net Salary Highlight Box */}
          <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 block">NET TAKE-HOME PAYABLE SALARY</span>
              <span className="text-2xl font-black text-emerald-700 font-mono">
                ₹{(breakdown.netPayable - Math.round(breakdown.monthWage / 23)).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right text-xs text-emerald-900">
              <p>Status: <strong className="text-emerald-700">PROCESSED & DISBURSED</strong></p>
              <p className="text-[11px] text-emerald-800 mt-0.5">Mode: Direct Bank Transfer</p>
            </div>
          </div>

          {/* Footer Signatures */}
          <div className="pt-8 border-t border-slate-300 flex justify-between text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">Dayflow HR Operations</p>
              <p className="text-[10px]">Computer Generated Document - No Physical Signature Required</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">Authorized Signature</p>
              <div className="mt-2 h-6 w-24 border-b border-slate-400 ml-auto" />
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer Action Bar (No Print) */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end space-x-3 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Export PDF</span>
          </button>
          <button 
            onClick={onClose} 
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
}
