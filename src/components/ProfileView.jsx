import React, { useState } from 'react';
import { User, Mail, Phone, Building2, MapPin, CreditCard, Shield, Edit3, X, FileText, Lock, Printer, Plus, Camera, Briefcase, Award } from 'lucide-react';
import { calculateSalaryBreakdown } from '../data/mockData';

export default function ProfileView({ 
  employee, 
  allEmployees, 
  onSelectEmployee, 
  currentUserRole,
  onUpdateEmployee,
  onOpenPayslip,
  isViewOnly = false
}) {
  const [activeTab, setActiveTab] = useState('work');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioState, setBioState] = useState({
    about: employee?.textBlocks?.about || '',
    loveJob: employee?.textBlocks?.loveJob || '',
    hobbies: employee?.textBlocks?.hobbies || ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [interactiveWage, setInteractiveWage] = useState(employee?.salaryConfig?.monthWage || 80000);

  if (!employee) return null;

  const salaryData = calculateSalaryBreakdown(interactiveWage);

  const handleSaveBio = () => {
    if (isViewOnly) return;
    onUpdateEmployee({
      ...employee,
      textBlocks: { ...bioState }
    });
    setIsEditingBio(false);
  };

  const handleAddSkill = () => {
    if (isViewOnly || !newSkill.trim()) return;
    const updatedSkills = [...(employee.skills || []), newSkill.trim()];
    onUpdateEmployee({ ...employee, skills: updatedSkills });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    if (isViewOnly) return;
    const updatedSkills = (employee.skills || []).filter(s => s !== skillToRemove);
    onUpdateEmployee({ ...employee, skills: updatedSkills });
  };

  const handleSaveWage = () => {
    if (isViewOnly) return;
    onUpdateEmployee({
      ...employee,
      salaryConfig: {
        ...(employee.salaryConfig || {}),
        monthWage: Number(interactiveWage)
      }
    });
    alert(`Updated monthly wage for ${employee.name} to ₹${Number(interactiveWage).toLocaleString('en-IN')}`);
  };

  return (
    <div className="space-y-5">
      
      {/* TOP SUB-BANNER TITLE */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">My Profile</h2>
          <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
            ID: {employee.id}
          </span>
        </div>

        {/* PAYSLIP & ACTION BUTTONS */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenPayslip(employee)}
            className="px-4 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-300 rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors"
          >
            <FileText className="h-4 w-4 text-sky-600" />
            <span>PAYSLIP</span>
          </button>
        </div>
      </div>

      {/* MAIN PROFILE CARD HEADER (Matching Wireframe) */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 space-y-6">
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          
          {/* Avatar with Pencil/Camera Overlay Button */}
          <div className="flex items-center space-x-5">
            <div className="relative group">
              <img
                src={employee.photo}
                alt={employee.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-slate-100 shadow-md"
              />
              <button 
                onClick={() => alert('Change profile photo feature active.')}
                className="absolute bottom-0 right-0 h-8 w-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                title="Edit profile photo"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>

            {/* Left Column Fields: Name, Position, Email, Mobile */}
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{employee.name}</h1>
              <div className="text-xs space-y-0.5 text-slate-600">
                <p><span className="text-slate-400 font-medium inline-block w-20">Job Position:</span> <strong className="text-slate-800">{employee.role}</strong></p>
                <p><span className="text-slate-400 font-medium inline-block w-20">Email:</span> <strong className="text-slate-800 font-mono">{employee.email}</strong></p>
                <p><span className="text-slate-400 font-medium inline-block w-20">Mobile:</span> <strong className="text-slate-800 font-mono">+91 98765 43210</strong></p>
              </div>
            </div>
          </div>

          {/* Right Column Fields: Company, Department, Manager, Location */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-1 w-full md:w-64 font-sans">
            <p className="flex justify-between"><span className="text-slate-400 font-medium">Company:</span> <strong className="text-slate-800">Dayflow Inc.</strong></p>
            <p className="flex justify-between"><span className="text-slate-400 font-medium">Department:</span> <strong className="text-slate-800">{employee.department}</strong></p>
            <p className="flex justify-between"><span className="text-slate-400 font-medium">Manager:</span> <strong className="text-slate-800">Alex Rivers</strong></p>
            <p className="flex justify-between"><span className="text-slate-400 font-medium">Location:</span> <strong className="text-slate-800">{employee.location || 'Remote'}</strong></p>
          </div>

        </div>

        {/* PROFILE SUB-TABS (Wireframe: Resume, Private Info, Salary Info, Security) */}
        <div className="border-b border-slate-200 flex space-x-6 text-xs font-bold pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-2.5 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'resume'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Resume
          </button>

          <button
            onClick={() => setActiveTab('private')}
            className={`pb-2.5 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'private'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Private Info
          </button>

          <button
            onClick={() => setActiveTab('salary')}
            className={`pb-2.5 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'salary'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Salary Info
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2.5 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Security
          </button>
        </div>

      </div>

      {/* TAB CONTENT: PRIVATE INFO (Matching Wireframe 2-Column Form Layout) */}
      {activeTab === 'private' && (
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Personal Identity */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Date of Birth</span>
                <span className="font-mono text-slate-800 font-semibold">{employee.dateOfBirth || '1995-08-14'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Residing Address</span>
                <span className="text-slate-800 font-semibold text-right">{employee.address || '742 Evergreen Terrace, SF, CA'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Nationality</span>
                <span className="text-slate-800 font-semibold">{employee.nationality || 'Indian'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Personal Email</span>
                <span className="font-mono text-slate-800 font-semibold">{employee.personalEmail || employee.email}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Gender</span>
                <span className="text-slate-800 font-semibold">{employee.gender || 'Male'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Marital Status</span>
                <span className="text-slate-800 font-semibold">{employee.maritalStatus || 'Single'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Date of Joining</span>
                <span className="font-mono text-slate-800 font-semibold">{employee.dateOfJoining || '2023-01-15'}</span>
              </div>
            </div>

            {/* Right Column: Bank Details */}
            <div className="space-y-3.5">
              <h3 className="font-extrabold text-slate-900 text-xs border-b border-slate-200 pb-2">Bank Details</h3>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Account Number</span>
                <span className="font-mono text-slate-800 font-bold">{employee.bankDetails?.accountNumber || '987654321000'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Bank Name</span>
                <span className="text-slate-800 font-semibold">{employee.bankDetails?.bankName || 'HDFC Bank'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">IFSC Code</span>
                <span className="font-mono text-slate-800 font-bold">{employee.bankDetails?.ifscCode || 'HDFC0001234'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">PAN No</span>
                <span className="font-mono text-slate-800 font-bold">{employee.bankDetails?.panNo || 'ABCDE1234F'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">UAN NO</span>
                <span className="font-mono text-slate-800 font-bold">{employee.bankDetails?.uanNo || '100987654321'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-bold block">Emp Code</span>
                <span className="font-mono text-sky-800 font-extrabold">{employee.id || 'EMP-101'}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: RESUME & SKILLS */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Verified Skill Tags</h3>
            <div className="flex flex-wrap gap-2">
              {(employee.skills || []).map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-sky-50 border border-sky-200 text-sky-800 font-bold rounded-lg flex items-center space-x-1.5">
                  <span>{skill}</span>
                  {!isViewOnly && (
                    <button onClick={() => handleRemoveSkill(skill)} className="hover:text-rose-600"><X className="h-3 w-3" /></button>
                  )}
                </span>
              ))}
            </div>
            {!isViewOnly && (
              <div className="pt-2 border-t border-slate-100 flex space-x-2">
                <input type="text" placeholder="Add skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)} className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" />
                <button onClick={handleAddSkill} className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg">+ Add</button>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Accreditation & Certifications</h3>
            <div className="space-y-2">
              {(employee.certifications || []).map((cert, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 flex items-center space-x-2">
                  <Award className="h-4 w-4 text-sky-600" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SALARY INFO (MATCHING WIREFRAME 2 & SECTION 3.6) */}
      {activeTab === 'salary' && (
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-6 text-xs font-sans">
          
          {/* Section 3.6 Badge */}
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
            <div className="flex items-center space-x-2">
              <span className={`h-2.5 w-2.5 rounded-full ${currentUserRole === 'admin' ? 'bg-sky-600' : 'bg-emerald-500'}`} />
              <span>{currentUserRole === 'admin' ? '3.6.2 Admin Payroll Control Panel' : '3.6.1 Employee Payroll View (Read-Only)'}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {currentUserRole === 'admin' ? 'Full Admin Write Privileges' : 'Payroll data is read-only for employees.'}
            </span>
          </div>

          {/* Top Wage Header (Month Wage, Yearly Wage, Working Days, Break Time) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 p-5 rounded-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Month Wage:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-black text-slate-900 text-base">₹{salaryData.monthWage.toLocaleString('en-IN')}</span>
                  <span className="text-slate-500 font-semibold">/ Month</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Yearly wage:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-black text-sky-700 text-base">₹{(salaryData.monthWage * 12).toLocaleString('en-IN')}</span>
                  <span className="text-slate-500 font-semibold">/ Yearly</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">No of working days in a week:</span>
                <span className="font-mono font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg">5 Days</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Break Time:</span>
                <span className="font-mono font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg">1.0 / hrs</span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Grids (Salary Components, PF Contribution, Tax Deductions) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column: Salary Components */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2">Salary Components</h3>
              
              <div className="space-y-2.5">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">Basic Salary</span>
                    <span className="font-mono text-slate-900">₹{salaryData.basicSalary.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">50.00 %</span></span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Define Basic salary from company cost compute it based on monthly Wages</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">House Rent Allowance</span>
                    <span className="font-mono text-slate-900">₹{salaryData.hra.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">50.00 %</span></span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">HRA provided to employees 50% of the basic salary</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">Standard Allowance</span>
                    <span className="font-mono text-slate-900">₹{salaryData.standardAllowance.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">16.67 %</span></span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">A standard allowance is a predetermined, fixed amount provided to employee as part of their salary</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">Performance Bonus</span>
                    <span className="font-mono text-slate-900">₹{salaryData.performanceBonus.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">8.33 %</span></span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Variable amount paid during payroll. The value defined by the company and calculated as a % of basic salary</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">Leave Travel Allowance</span>
                    <span className="font-mono text-slate-900">₹{salaryData.lta.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">8.33 %</span></span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">LTA is paid by the company to employees to cover their travel expenses, and calculated as a % of basic salary</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">Fixed Allowance</span>
                    <span className="font-mono text-slate-900">₹{salaryData.fixedAllowance.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">11.67 %</span></span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Fixed allowance portion of wages is determined after calculating all salary components</p>
                </div>
              </div>
            </div>

            {/* Right Column: PF Contribution & Tax Deductions */}
            <div className="space-y-6">
              
              {/* PF Contribution */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2">Provident Fund (PF) Contribution</h3>
                
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-800">Employee</span>
                      <span className="font-mono text-slate-900">₹{salaryData.pfEmployee.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">12.00 %</span></span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">PF is calculated based on the basic salary</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-800">Employer</span>
                      <span className="font-mono text-slate-900">₹{salaryData.pfEmployer.toLocaleString('en-IN')} / month <span className="text-slate-400 font-normal ml-2">12.00 %</span></span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">PF is calculated based on the basic salary</p>
                  </div>
                </div>
              </div>

              {/* Tax Deductions */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2">Tax Deductions</h3>
                
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">Professional Tax</span>
                    <span className="font-mono text-slate-900">₹{salaryData.professionalTax.toLocaleString('en-IN')} / month</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Professional Tax deducted from the Gross salary</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4 text-xs font-sans">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2">Account Security & Access Control</h3>
          <div className="space-y-3 max-w-md">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <span className="font-bold text-slate-900 block">Password</span>
                <span className="text-slate-500 text-[11px]">Last changed 30 days ago</span>
              </div>
              <button 
                onClick={() => alert('Password reset link sent to your work email.')}
                className="px-3 py-1.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Reset Password
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <span className="font-bold text-slate-900 block">Two-Factor Authentication (2FA)</span>
                <span className="text-slate-500 text-[11px]">Enabled via Authenticator App</span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold">
                Active
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

