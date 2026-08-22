import React, { useState } from 'react';
import { X, Calendar, Upload, Paperclip } from 'lucide-react';

export default function LeaveModal({ 
  isOpen, 
  onClose, 
  employees, 
  currentEmployee,
  initialData = null,
  selectedDate = null,
  onApplyLeave 
}) {
  const [formData, setFormData] = useState({
    employeeId: currentEmployee?.id || 'OIPRDI20230001',
    employeeName: currentEmployee?.name || 'Prannoy Didymus J',
    type: 'Paid time off',
    startDate: '2026-05-13',
    endDate: '2026-05-14',
    remarks: '',
    attachmentName: ''
  });

  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          employeeId: initialData.employeeId || currentEmployee?.id || 'OIPRDI20230001',
          employeeName: initialData.employeeName || currentEmployee?.name || 'Prannoy Didymus J',
          type: initialData.type || 'Paid time off',
          startDate: initialData.startDate || '2026-05-13',
          endDate: initialData.endDate || initialData.startDate || '2026-05-14',
          remarks: initialData.remarks || '',
          attachmentName: initialData.attachmentName || ''
        });
      } else if (selectedDate) {
        setFormData({
          employeeId: currentEmployee?.id || 'OIPRDI20230001',
          employeeName: currentEmployee?.name || 'Prannoy Didymus J',
          type: 'Paid time off',
          startDate: selectedDate,
          endDate: selectedDate,
          remarks: '',
          attachmentName: ''
        });
      }
    }
  }, [isOpen, initialData, selectedDate, currentEmployee]);

  if (!isOpen) return null;

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e - s;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const totalDays = calculateDays(formData.startDate, formData.endDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      id: `LEAVE-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      totalDays,
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    onApplyLeave(newReq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Time off Type Request</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Employee Name */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <label className="text-slate-600 font-bold">Employee</label>
            <div className="col-span-2">
              <input
                type="text"
                disabled
                value={`[${formData.employeeName}]`}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sky-700 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Time off Type */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <label className="text-slate-600 font-bold">Time off Type</label>
            <div className="col-span-2">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-1.5 bg-sky-50 border border-sky-200 rounded-lg font-bold text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Paid time off">[Paid time off]</option>
                <option value="Sick Leave">[Sick Leave]</option>
                <option value="Unpaid Leaves">[Unpaid Leaves]</option>
              </select>
            </div>
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <label className="text-slate-600 font-bold">Validity Period</label>
            <div className="col-span-2 flex items-center space-x-2">
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
              />
              <span className="text-slate-500 font-medium">To</span>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Allocation */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <label className="text-slate-600 font-bold">Allocation</label>
            <div className="col-span-2 flex items-center space-x-2 font-mono">
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-900">
                {String(totalDays).padStart(2, '0')}.00
              </span>
              <span className="text-slate-600 font-bold">Days</span>
            </div>
          </div>

          {/* Attachment */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <label className="text-slate-600 font-bold">Attachment:</label>
            <div className="col-span-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attachmentName: 'medical_certificate.pdf' })}
                className="px-3 py-1.5 bg-sky-600 text-white hover:bg-sky-700 rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload File</span>
              </button>
              <span className="text-[10px] text-slate-500 block mt-1">(For sick leave certificate)</span>
              {formData.attachmentName && (
                <span className="text-emerald-600 font-bold text-[11px] block mt-0.5">{formData.attachmentName}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition-colors"
            >
              Discard
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

