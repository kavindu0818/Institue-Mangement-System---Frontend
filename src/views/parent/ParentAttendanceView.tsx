import React from 'react';
import { ClipboardCheck, CheckCircle2, AlertTriangle, Calendar, Clock } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const ParentAttendanceView: React.FC = () => {
  const { records } = useAppSelector((state) => state.attendance);

  // Focus on child 'stu-1'
  const childRecords = records.filter((r) => r.studentId === 'stu-1');

  const presentCount = childRecords.filter((r) => r.status === 'Present').length;
  const lateCount = childRecords.filter((r) => r.status === 'Late').length;
  const absentCount = childRecords.filter((r) => r.status === 'Absent').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Child Attendance & Presence Tracker
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Figma Screen: "Attendance" — Real-time entrance gate scans and class session presence for Alex Morgan
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Present Sessions
          </span>
          <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
            {presentCount}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Lectures attended on-time</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
            Late Arrivals
          </span>
          <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
            {lateCount}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Arrived within 15 min buffer</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
            Recorded Absences
          </span>
          <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
            {absentCount}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Instant SMS sent to parent</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Attendance Log Entries (Last 30 Days)
          </h3>
          <Badge variant="success" dot={true}>
            Live Scanner Sync
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 pl-6">Date</th>
                <th className="py-3.5">Subject</th>
                <th className="py-3.5">Class Time</th>
                <th className="py-3.5">Scan Location</th>
                <th className="py-3.5 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {childRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-6 font-medium text-slate-900">
                    {rec.date}
                  </td>
                  <td className="py-3.5 font-semibold text-purple-900">
                    {rec.subject}
                  </td>
                  <td className="py-3.5 text-slate-500 font-mono text-xs">
                    {rec.time || '09:00 AM'}
                  </td>
                  <td className="py-3.5 text-slate-600">Gate Scanner B • Hall B-201</td>
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
