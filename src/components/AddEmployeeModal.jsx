import React, { useState } from 'react';
import { X, UserPlus, Shield } from 'lucide-react';
import { generateEmployeeId } from '../data/mockData';

export default function AddEmployeeModal({ isOpen, onClose, onAddEmployee }) {
  const [formData, setFormData] = useState({
    name: '',
    companyName: 'Odoo India',
    role: '',
    department: 'Engineering',
    email: '',
    phone: '+91 98765 43210',
    location: 'Bengaluru, KA',
    dateOfJoining: new Date().toISOString().split('T')[0],
    monthWage: 65000,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const joiningYear = formData.dateOfJoining ? new Date(formData.dateOfJoining).getFullYear() : 2026;
    const serialNum = Math.floor(1 + Math.random() * 99);
    const newEmpId = generateEmployeeId(formData.companyName, formData.name, joiningYear, serialNum);

    const newEmployee = {
      id: newEmpId,
      name: formData.name,
      companyName: formData.companyName,
      role: formData.accountRole === 'admin' ? (formData.role || 'HR Admin') : (formData.role || 'Software Engineer'),
      userRole: formData.accountRole || (formData.role.toLowerCase().includes('admin') ? 'admin' : 'employee'),
      department: formData.department,
      status: 'present',
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      photo: formData.photo,
      dateOfJoining: formData.dateOfJoining,
      dateOfBirth: '1995-08-15',
      address: 'HSR Layout, Bengaluru, 560102',
      nationality: 'Indian',
      gender: 'Unspecified',
      personalEmail: formData.email,
      maritalStatus: 'Single',
      bankDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '50100234567890',
        ifscCode: 'HDFC0000240',
        panNo: 'ABCDE1234F',
        uanNo: '100900800700',
        empCode: newEmpId
      },
      salaryConfig: {
        monthWage: Number(formData.monthWage),
        workingDaysPerWeek: 5,
        breakTimeHrs: 1.0
      },
      skills: ['React', 'JavaScript', 'Tailwind CSS'],
      certifications: ['AWS Certified Cloud Practitioner'],
      leaveBalance: {
        paidLeaveDays: 24,
        paidLeaveUsed: 0,
        sickLeaveDays: 7,
        sickLeaveUsed: 0,
        unpaidLeaveDays: 0
      },
      textBlocks: {
        about: 'Newly onboarded team member.',
        loveJob: 'Excited to contribute to high-impact projects.',
        hobbies: 'Technology, reading, travel.'
      }
    };

    onAddEmployee(newEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4 text-sky-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Onboard New Employee</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Singh"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Job Designation</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Frontend Engineer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Product Design">Product Design</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Corporate Email</label>
              <input
                type="email"
                required
                placeholder="name@dayflow.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">System Access Privilege</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, accountRole: 'employee' })}
                className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  (formData.accountRole || 'employee') === 'employee'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs ring-1 ring-sky-500'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>👤 Regular Employee</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, accountRole: 'admin' })}
                className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  formData.accountRole === 'admin'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs ring-1 ring-sky-500'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🛡️ HR Admin</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Monthly Wage (Gross ₹)</label>
              <input
                type="number"
                required
                value={formData.monthWage}
                onChange={(e) => setFormData({ ...formData, monthWage: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Date of Joining</label>
              <input
                type="date"
                required
                value={formData.dateOfJoining}
                onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-[11px] text-sky-800">
            Initial password: <strong className="text-sky-900 font-mono">Dayflow@2026!</strong> (User will be prompted to change password on first login).
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold shadow-xs transition-colors"
            >
              Complete Onboarding
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

