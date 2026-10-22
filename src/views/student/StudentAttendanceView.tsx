import React from 'react';
import { ClipboardCheck, CheckCircle2, XCircle, Clock, Calendar, AlertCircle } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const StudentAttendanceView: React.FC = () => {
  const { records } = useAppSelector((state) => state.attendance);
  const { currentUser } = useAppSelector((state) => state.auth);

  const studentRecords = records.filter(
    (r) => r.studentId === currentUser.id || r.studentId === 'stu-1'
  );

  const presentSessions = studentRecords.filter((r) => r.status === 'Present').length;
  const lateSessions = studentRecords.filter((r) => r.status === 'Late').length;
  const absentSessions = studentRecords.filter((r) => r.status === 'Absent').length;

  const attendancePct = Math.round(
    ((presentSessions + lateSessions * 0.5) / (studentRecords.length || 1)) * 100
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Personal Attendance Register & History
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Figma Screen: "Attendance" — Real-time verified campus presence and lecture logs
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Overall Attendance
          </span>
          <span className="text-3xl font-extrabold text-indigo-600 mt-1 block">
            {attendancePct}%
          </span>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            Good Standing (≥ 85%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Present Sessions
          </span>
          <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">
            {presentSessions}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Lectures attended</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Late Arrivals
          </span>
          <span className="text-3xl font-extrabold text-amber-600 mt-1 block">
            {lateSessions}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Within 15 mins grace</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Absences
          </span>
          <span className="text-3xl font-extrabold text-rose-600 mt-1 block">
            {absentSessions}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Excused & Unexcused</span>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Recent Attendance Ledger Entries
          </h3>
          <span className="text-xs text-slate-500">
            Recorded via Dynamic QR Scanner & Manual Override
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 pl-6">Date</th>
                <th className="py-3.5">Subject & Lecture</th>
                <th className="py-3.5">Batch</th>
                <th className="py-3.5">Scan Timestamp</th>
                <th className="py-3.5">Verified By</th>
                <th className="py-3.5 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-6 font-medium text-slate-900">
                    {rec.date}
                  </td>
                  <td className="py-3.5 font-semibold text-indigo-700">
                    {rec.subject}
                  </td>
                  <td className="py-3.5 text-slate-600">{rec.batch}</td>
                  <td className="py-3.5 text-slate-500 font-mono text-xs">
                    {rec.time || '09:00 AM'}
                  </td>
                  <td className="py-3.5 text-slate-600">{rec.markedBy}</td>
                  <td className="py-3.5 pr-6 text-right">
                    <Badge
                      variant={
                        rec.status === 'Present'
                          ? 'success'
                          : rec.status === 'Absent'
                          ? 'danger'
                          : 'warning'
                      }
                      dot={true}
                    >
                      {rec.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
