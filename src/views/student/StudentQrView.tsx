import React, { useState } from 'react';
import { QrCode, CheckCircle2, ShieldCheck, Download, RefreshCw, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setAttendanceStatus } from '../../store/attendanceSlice';

export const StudentQrView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleSimulateCheckIn = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckInTime(timeStr);
    setIsCheckedIn(true);

    dispatch(
      setAttendanceStatus({
        studentId: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        subject: 'Quantum Physics',
        status: 'Present',
      })
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Digital Student ID & Instant QR Pass
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Figma Screen: "QR" — Show your dynamic QR pass at the entrance scanner to record classroom attendance
        </p>
      </div>

      {isCheckedIn && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-left animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-950">
                Attendance Check-In Confirmed!
              </p>
              <p className="text-xs text-emerald-700">
                Verified at Hall B-201 at {checkInTime}. Present status recorded.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckedIn(false)}
            className="text-xs text-emerald-700 hover:underline font-semibold"
          >
            Reset
          </button>
        </div>
      )}

      {/* ID Badge Card */}
      <div className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-indigo-800/40 relative overflow-hidden text-left">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-indigo-800/60">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Apex Tuition & Science Institute
            </h3>
            <p className="text-[10px] text-slate-400">Official Student Identity Pass</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
            Active 2026/27
          </span>
        </div>

        {/* Center Details with Photo & QR */}
        <div className="py-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex flex-col items-center shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg"
            />
            <span className="text-[11px] font-mono text-indigo-300 mt-2 font-bold">
              ID: {currentUser.studentId || 'APEX-2026-4412'}
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div>
              <p className="text-xs text-indigo-300 font-medium">Student Name</p>
              <h4 className="text-xl font-extrabold text-white">{currentUser.name}</h4>
            </div>
            <div>
              <p className="text-xs text-indigo-300 font-medium">Program & Batch</p>
              <p className="text-sm font-semibold text-slate-200">
                Grade 12 Advanced STEM • Batch Alpha
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 pt-1">
              <span>Expiry: <strong>June 2027</strong></span>
              <span>•</span>
              <span>Blood Group: <strong>O+</strong></span>
            </div>
          </div>
        </div>

        {/* Dynamic SVG QR Code Simulation */}
        <div className="bg-white p-5 rounded-2xl text-slate-900 flex flex-col items-center justify-center shadow-inner">
          <div className="p-3 bg-slate-50 border-2 border-slate-200 rounded-xl relative">
            <svg
              className="w-44 h-44"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Stylized QR Code Pattern */}
              <rect x="5" y="5" width="28" height="28" rx="4" fill="#1e1b4b" />
              <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
              <rect x="13" y="13" width="12" height="12" rx="1" fill="#1e1b4b" />

              <rect x="67" y="5" width="28" height="28" rx="4" fill="#1e1b4b" />
              <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
              <rect x="75" y="13" width="12" height="12" rx="1" fill="#1e1b4b" />

              <rect x="5" y="67" width="28" height="28" rx="4" fill="#1e1b4b" />
              <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
              <rect x="13" y="75" width="12" height="12" rx="1" fill="#1e1b4b" />

              {/* Data matrix dots */}
              <rect x="38" y="10" width="8" height="8" rx="1" fill="#4f46e5" />
              <rect x="50" y="10" width="8" height="8" rx="1" fill="#1e1b4b" />
              <rect x="38" y="24" width="8" height="8" rx="1" fill="#1e1b4b" />
              <rect x="50" y="24" width="8" height="8" rx="1" fill="#4f46e5" />

              <rect x="10" y="38" width="8" height="8" rx="1" fill="#1e1b4b" />
              <rect x="24" y="38" width="8" height="8" rx="1" fill="#4f46e5" />
              <rect x="38" y="38" width="24" height="24" rx="2" fill="#1e1b4b" />
              <rect x="42" y="42" width="16" height="16" rx="1" fill="white" />
              <rect x="46" y="46" width="8" height="8" rx="1" fill="#4f46e5" />

              <rect x="67" y="38" width="12" height="8" rx="1" fill="#1e1b4b" />
              <rect x="83" y="38" width="8" height="8" rx="1" fill="#4f46e5" />
              <rect x="67" y="50" width="8" height="12" rx="1" fill="#4f46e5" />
              <rect x="80" y="50" width="12" height="8" rx="1" fill="#1e1b4b" />

              <rect x="38" y="67" width="12" height="8" rx="1" fill="#4f46e5" />
              <rect x="54" y="67" width="8" height="8" rx="1" fill="#1e1b4b" />
              <rect x="38" y="80" width="8" height="12" rx="1" fill="#1e1b4b" />
              <rect x="50" y="80" width="12" height="8" rx="1" fill="#4f46e5" />

              <rect x="67" y="67" width="8" height="8" rx="1" fill="#1e1b4b" />
              <rect x="80" y="67" width="12" height="12" rx="1" fill="#4f46e5" />
              <rect x="67" y="80" width="8" height="12" rx="1" fill="#4f46e5" />
              <rect x="80" y="84" width="12" height="8" rx="1" fill="#1e1b4b" />
            </svg>
          </div>
          <p className="text-[11px] font-mono font-semibold text-slate-500 mt-3 tracking-wider">
            TOKEN: {currentUser.studentId}-QR-{Date.now().toString().slice(-4)}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-indigo-800/60">
          <span className="text-[11px] text-slate-400">
            Powered by Secure NFC & Dynamic QR Sync
          </span>

          <button
            onClick={handleSimulateCheckIn}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Simulate Campus Check-In
          </button>
        </div>
      </div>
    </div>
  );
};
