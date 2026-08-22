import React, { useState } from 'react';
import { Lock, Mail, User, Phone, Building2, Upload, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { generateEmployeeId } from '../data/mockData';
import { loginFirebaseUser } from '../services/api';

export default function AuthModal({ isOpen, employees = [], onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  
  // Sign In state
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up state
  const [companyName, setCompanyName] = useState('Odoo India');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('employee');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  if (!isOpen) return null;

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const cleanInput = loginInput.trim().toLowerCase();
    
    // Find employee matching Login ID (e.g. OIJODO20220001) or Email
    const existingEmployee = employees.find(emp => 
      emp.email.toLowerCase() === cleanInput || 
      emp.id.toLowerCase() === cleanInput
    );

    if (existingEmployee) {
      setLoading(false);
      const roleType = (existingEmployee.role.includes('Admin') || existingEmployee.role.includes('VP')) ? 'admin' : 'employee';
      onLoginSuccess(existingEmployee, roleType);
    } else {
      setLoading(false);
      setErrorMessage(`No account found matching Login ID or Email "${loginInput}". Try demo account "OIPRDI20230001" or switch to Sign Up.`);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (signupPassword !== confirmPassword) {
      setLoading(false);
      setErrorMessage('Password and Confirm Password do not match.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailExists = employees.some(emp => emp.email.toLowerCase() === cleanEmail);
    if (emailExists) {
      setLoading(false);
      setErrorMessage(`An employee account with email "${cleanEmail}" is already registered.`);
      return;
    }

    // Auto-generate Login ID according to format rule: [OI][JODO][2026][0001]
    const joiningYear = new Date().getFullYear();
    const serialNum = employees.length + 1;
    const generatedId = generateEmployeeId(companyName, fullName, joiningYear, serialNum);

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=9333ea&color=ffffff&bold=true`;

    const newRegisteredUser = {
      id: generatedId,
      name: fullName.trim(),
      companyName: companyName.trim() || 'Odoo India',
      email: cleanEmail,
      phone: phone.trim() || '+91 98765 43210',
      role: selectedRole === 'admin' ? 'HR Manager & Admin' : 'Software Engineer',
      department: selectedRole === 'admin' ? 'Human Resources' : 'Engineering',
      status: 'present',
      location: 'Bengaluru, KA',
      photo: avatarUrl,
      dateOfJoining: new Date().toISOString().split('T')[0],
      dateOfBirth: '1996-05-14',
      address: 'HSR Layout, Bengaluru, 560102',
      nationality: 'Indian',
      gender: 'Specified',
      personalEmail: cleanEmail,
      maritalStatus: 'Single',
      bankDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '50100' + Math.floor(100000000 + Math.random() * 900000000),
        ifscCode: 'HDFC0000240',
        panNo: 'ABCDE' + Math.floor(1000 + Math.random() * 9000) + 'F',
        uanNo: '100900' + Math.floor(10000 + Math.random() * 90000),
        empCode: generatedId
      },
      salaryConfig: { monthWage: selectedRole === 'admin' ? 110000 : 75000 },
      skills: ['React', 'Node.js', 'System Architecture'],
      certifications: ['Certified Professional'],
      leaveBalance: { paidLeaveDays: 24, paidLeaveUsed: 0, sickLeaveDays: 7, sickLeaveUsed: 0, unpaidLeaveDays: 0 },
      textBlocks: {
        about: `Newly registered employee at ${companyName}.`,
        loveJob: 'Collaborating across teams and delivering high-quality results.',
        hobbies: 'Technology, reading, and problem solving.'
      }
    };

    try {
      await loginFirebaseUser(cleanEmail, signupPassword);
      setLoading(false);
      onLoginSuccess(newRegisteredUser, selectedRole);
    } catch (err) {
      setLoading(false);
      onLoginSuccess(newRegisteredUser, selectedRole);
    }
  };

  const handleQuickDemoLogin = (loginIdOrEmail, roleType) => {
    const user = employees.find(e => e.id === loginIdOrEmail || e.email === loginIdOrEmail) || employees[0];
    onLoginSuccess(user, roleType);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 text-slate-900 rounded-2xl max-w-md w-full p-7 space-y-6 shadow-2xl my-auto">
        
        {/* App/Web Logo Box (Clean White & Light Slate Theme) */}
        {/* Header Branding Logo */}
        <div className="bg-slate-100 border border-slate-200 p-3 rounded-xl flex items-center justify-center space-x-2.5">
          <img 
            src="/dayflow-logo.png" 
            alt="Dayflow HRMS Logo" 
            className="h-9 w-auto object-contain" 
          />
          <span className="font-extrabold text-sm tracking-wide text-slate-900 uppercase">Dayflow HRMS</span>
        </div>

        {/* ==================== SIGN IN VIEW ==================== */}
        {authMode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs font-sans">
            <h2 className="text-center font-extrabold text-sm text-slate-900 uppercase tracking-wider">Sign in Page</h2>
            
            {/* Login Id / Email :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Login Id / Email :-</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. OIPRDI20230001 or prannoy.j@dayflow.io"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Password :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Password :-</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start space-x-2 text-rose-700 text-[11px] font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SIGN IN BUTTON (Matching Sky Blue App Theme) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-lg text-xs tracking-wider uppercase transition-colors shadow-sm mt-2"
            >
              {loading ? 'Authenticating...' : 'SIGN IN'}
            </button>

            {/* Toggle Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
                className="text-slate-600 hover:text-sky-600 font-semibold transition-colors text-[11px]"
              >
                Don't have an Account? <span className="underline font-bold text-sky-600">Sign Up</span>
              </button>
            </div>

            {/* Quick Demo Sign In Shortcuts */}
            <div className="pt-3 border-t border-slate-200 space-y-1.5 text-[11px]">
              <span className="text-slate-500 font-semibold block">Quick Demo Logins:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('sarah.jenkins@dayflow.io', 'admin')}
                  className="p-2 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-left transition-colors"
                >
                  <span className="font-bold text-slate-900 block text-[11px]">HR Admin</span>
                  <span className="text-[10px] text-sky-700 block font-mono">OISAJE20230002</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('prannoy.j@dayflow.io', 'employee')}
                  className="p-2 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-left transition-colors"
                >
                  <span className="font-bold text-slate-900 block text-[11px]">Employee</span>
                  <span className="text-[10px] text-sky-700 block font-mono">OIPRDI20230001</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ==================== SIGN UP VIEW ==================== */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs font-sans">
            <h2 className="text-center font-extrabold text-sm text-slate-900 uppercase tracking-wider">Sign Up Page</h2>

            {/* Company Name :- + Upload Logo Button */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Company Name :-</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Odoo India"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
                />
                <label className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg cursor-pointer flex items-center space-x-1 transition-colors shrink-0" title="Upload Logo">
                  <Upload className="h-3.5 w-3.5" />
                  <span className="text-[10px]">Upload Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Name :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Name :-</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Account Role Assignment :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Assign Account Role :-</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('employee')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedRole === 'employee'
                      ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs ring-1 ring-sky-500'
                      : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <User className="h-3.5 w-3.5 text-sky-600" />
                  <span>Regular Employee</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs ring-1 ring-sky-500'
                      : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Shield className="h-3.5 w-3.5 text-sky-600" />
                  <span>HR Admin</span>
                </button>
              </div>
            </div>

            {/* Email :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Email :-</label>
              <input
                type="email"
                required
                placeholder="john.doe@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Phone :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Phone :-</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Password :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Password :-</label>
              <div className="relative">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-2 text-slate-400 hover:text-slate-700"
                >
                  {showSignupPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password :- */}
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold">Confirm Password :-</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2 text-slate-400 hover:text-slate-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start space-x-2 text-rose-700 text-[11px] font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SIGN UP BUTTON (Light Blue Theme) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-lg text-xs tracking-wider uppercase transition-colors shadow-sm mt-2"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Toggle Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
                className="text-slate-600 hover:text-sky-600 font-semibold transition-colors text-[11px]"
              >
                Already have an account ? <span className="underline font-bold text-sky-600">Sign In</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

