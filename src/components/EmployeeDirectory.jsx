import React, { useState } from 'react';
import { Search, Plus, Filter, Mail, Phone, Building2, MapPin, ExternalLink, Shield, Plane } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';

export default function EmployeeDirectory({ 
  employees, 
  onSelectEmployee, 
  currentUserRole,
  onAddEmployee 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // Default to grid/cards mode as in wireframe
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Wireframe status indicator rule:
  // Green dot: Employee is present in the office
  // Airplane icon: Employee is on leave
  // Yellow dot: Employee is absent
  const renderStatusIndicator = (status) => {
    switch (status) {
      case 'present':
        return (
          <div className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full" title="Present in office">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs" />
            <span className="text-[10px] font-bold text-emerald-700">Present</span>
          </div>
        );
      case 'on_leave':
        return (
          <div className="flex items-center space-x-1 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full" title="On Leave">
            <Plane className="h-3.5 w-3.5 text-sky-600" />
            <span className="text-[10px] font-bold text-sky-700">On Leave</span>
          </div>
        );
      case 'absent':
        return (
          <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full" title="Absent">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block shadow-2xs" />
            <span className="text-[10px] font-bold text-amber-700">Absent</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
        
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full sm:w-40 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Product Design">Product Design</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-32 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="present">Present</option>
            <option value="on_leave">On Leave</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        {/* Right Toggle & Add Employee */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              List
            </button>
          </div>

          {currentUserRole === 'admin' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Employee</span>
            </button>
          )}
        </div>

      </div>

      {/* Directory Grid View (Cards as shown in wireframe) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => onSelectEmployee(emp, true)} // Open in View-Only mode
              className="bg-white border border-slate-200 hover:border-sky-300 rounded-xl p-5 cursor-pointer space-y-4 shadow-xs hover:shadow-md transition-all relative group"
            >
              {/* Top Row: Avatar + Name + TOP-RIGHT STATUS INDICATOR */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <img src={emp.photo} alt={emp.name} className="h-12 w-12 rounded-xl object-cover border border-slate-200 shadow-2xs" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">{emp.name}</h3>
                    <p className="text-xs font-semibold text-slate-500">{emp.role}</p>
                  </div>
                </div>

                {/* Top-Right Status Indicator Icon */}
                <div className="absolute top-4 right-4">
                  {renderStatusIndicator(emp.status)}
                </div>
              </div>

              {/* Basic Info */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5 font-medium">
                <p>Dept: <span className="font-bold text-slate-900">{emp.department}</span></p>
                <p>Email: <span className="font-bold text-slate-900 truncate block">{emp.email}</span></p>
                <p>Wage: <span className="font-mono font-bold text-sky-700">₹{(emp.salaryConfig?.monthWage || 0).toLocaleString('en-IN')}/mo</span></p>
              </div>

              {/* View Only Indicator Footer */}
              <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-50">
                <span className="font-mono font-bold text-slate-500">{emp.id}</span>
                <span className="text-sky-600 font-bold group-hover:underline">Click to View Profile →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Directory Table View (List) */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Monthly Wage</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-sky-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={emp.photo} alt={emp.name} className="h-8 w-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <span className="font-bold text-slate-900 block">{emp.name}</span>
                        <span className="text-[11px] text-slate-500">{emp.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-sky-700">{emp.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{emp.department}</td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{emp.location}</td>
                  <td className="py-3 px-4">{renderStatusIndicator(emp.status)}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    ₹{(emp.salaryConfig?.monthWage || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectEmployee(emp, true)} // Open in View-Only mode
                      className="px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg text-[11px] font-bold transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddEmployee={onAddEmployee}
      />

    </div>
  );
}


