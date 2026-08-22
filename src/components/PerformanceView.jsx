import React, { useState } from 'react';
import { Star, Award, Target, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';

export default function PerformanceView({ employees, performanceData, onUpdatePerformance, currentUserRole, currentEmployee }) {
  const [selectedEmpId, setSelectedEmpId] = useState(currentEmployee?.id || 'EMP-101');
  const [newOkrTitle, setNewOkrTitle] = useState('');
  const [newFeedbackText, setNewFeedbackText] = useState('');

  const currentEmp = employees.find(e => e.id === selectedEmpId) || employees[0];
  const currentPerf = performanceData.find(p => p.employeeId === selectedEmpId) || {
    employeeId: selectedEmpId,
    quarter: 'Q2 2026',
    rating: 4.5,
    status: 'Meets Expectations',
    reviewer: 'HR Administration',
    okrs: [
      { title: 'Complete Quarterly System Maintenance', progress: 80, targetDate: '2026-08-31' }
    ],
    peerFeedback: []
  };

  const handleAddOkr = () => {
    if (!newOkrTitle.trim()) return;
    const updatedOkrs = [...(currentPerf.okrs || []), { title: newOkrTitle.trim(), progress: 0, targetDate: '2026-09-30' }];
    const updatedPerf = { ...currentPerf, okrs: updatedOkrs };
    onUpdatePerformance(updatedPerf);
    setNewOkrTitle('');
  };

  const handleAddFeedback = () => {
    if (!newFeedbackText.trim()) return;
    const newEntry = {
      author: currentEmployee.name,
      role: currentEmployee.role,
      comment: newFeedbackText.trim()
    };
    const updatedFeedback = [...(currentPerf.peerFeedback || []), newEntry];
    const updatedPerf = { ...currentPerf, peerFeedback: updatedFeedback };
    onUpdatePerformance(updatedPerf);
    setNewFeedbackText('');
  };

  return (
    <div className="space-y-5">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Performance Appraisals & OKR Tracking</h2>
          <p className="text-xs text-slate-500 font-medium">Quarterly ratings, OKR milestone completion, and peer feedback telemetry.</p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
          >
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.department})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2">
          <span className="text-slate-500 font-bold block">Q2 2026 Appraisal Score</span>
          <div className="flex items-baseline space-x-2 font-mono">
            <span className="text-3xl font-black text-sky-600">{currentPerf.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-xs font-bold">/ 5.0</span>
          </div>
          <span className="text-[11px] text-slate-500 block font-semibold">Evaluated by: {currentPerf.reviewer}</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2">
          <span className="text-slate-500 font-bold block">Appraisal Status</span>
          <div className="pt-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {currentPerf.status}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block font-semibold">Review Cycle: Q2 2026</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-2">
          <span className="text-slate-500 font-bold block">Active Key Results (OKRs)</span>
          <div className="flex items-baseline space-x-2 font-mono">
            <span className="text-3xl font-black text-slate-900">{(currentPerf.okrs || []).length}</span>
            <span className="text-slate-500 text-xs font-semibold">Milestones</span>
          </div>
          <span className="text-[11px] text-slate-500 block font-semibold">Quarterly goals</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Objectives & Key Results (OKRs)</h3>
            <span className="text-[11px] text-slate-500 font-mono font-bold">Progress (%)</span>
          </div>

          <div className="space-y-3">
            {(currentPerf.okrs || []).map((okr, idx) => (
              <div key={idx} className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-900 font-bold">{okr.title}</span>
                  <span className="font-mono text-sky-700 font-bold">{okr.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-sky-600 h-full rounded-full" style={{ width: `${okr.progress}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 block font-mono font-semibold">Target: {okr.targetDate}</span>
              </div>
            ))}
          </div>

          {currentUserRole === 'admin' && (
            <div className="pt-3 border-t border-slate-100 flex space-x-2">
              <input
                type="text"
                placeholder="New OKR title..."
                value={newOkrTitle}
                onChange={e => setNewOkrTitle(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none"
              />
              <button onClick={handleAddOkr} className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors">+ Add OKR</button>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Peer Feedback & Endorsements</h3>
            <span className="text-[11px] text-slate-500 font-mono font-bold">{(currentPerf.peerFeedback || []).length} Entries</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto">
            {(currentPerf.peerFeedback || []).length === 0 ? (
              <p className="text-slate-400 italic">No peer feedback logged yet for this quarter.</p>
            ) : (
              (currentPerf.peerFeedback || []).map((fb, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{fb.author}</span>
                    <span className="text-[10px] text-sky-700 font-semibold">{fb.role}</span>
                  </div>
                  <p className="text-slate-600 italic text-[11px]">"{fb.comment}"</p>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <textarea
              rows={2}
              placeholder="Submit feedback for this colleague..."
              value={newFeedbackText}
              onChange={e => setNewFeedbackText(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={handleAddFeedback}
              className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors"
            >
              Submit Peer Feedback
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

