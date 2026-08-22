import React from 'react';
import { X, CheckCircle2, Clock, Calendar, Sparkles, ChevronRight, Copy, Check } from 'lucide-react';
import { HOURLY_PROJECT_ROADMAP } from '../data/mockData';

export default function HourlyRoadmapModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  if (!isOpen) return null;

  const copyHourSummary = (item, idx) => {
    const text = `📌 Dayflow HRMS - ${item.hour} Progress Update:\nModule: ${item.title}\nDeliverables:\n${item.deliverables.map(d => `• ${d}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>8-Hour Project Roadmap & Hourly Progress Updates</span>
              </h2>
              <p className="text-xs text-slate-400">
                Use these hourly updates to present progress to your team or evaluator phase-by-phase.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {HOURLY_PROJECT_ROADMAP.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 hover:border-indigo-500/50 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.hour}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100">{item.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {item.status}
                  </span>
                  <button
                    onClick={() => copyHourSummary(item, idx)}
                    className="p-1.5 rounded bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs flex items-center space-x-1 transition-all"
                    title="Copy Hourly Update Text"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="text-[10px]">Copy Update</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <ul className="pl-4 space-y-1 text-xs text-slate-300 list-disc">
                {item.deliverables.map((d, dIdx) => (
                  <li key={dIdx}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            Close & Resume App Demo
          </button>
        </div>

      </div>
    </div>
  );
}
