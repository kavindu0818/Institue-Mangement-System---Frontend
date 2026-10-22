import React from 'react';
import {
  Users,
  GraduationCap,
  CreditCard,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ShieldAlert,
  Send,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { useAppSelector } from '../../store';

interface InstituteDashboardProps {
  onNavigate: (view: string) => void;
}

export const InstituteDashboard: React.FC<InstituteDashboardProps> = ({ onNavigate }) => {
  const { students } = useAppSelector((state) => state.attendance);
  const { staff, auditLogs } = useAppSelector((state) => state.institute);
  const { invoices } = useAppSelector((state) => state.fees);

  const totalRevenueCollected = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingRevenue = invoices
    .filter((inv) => inv.status !== 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const avgAttendance = (
    students.reduce((acc, s) => acc + s.attendanceRate, 0) / (students.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold tracking-wide uppercase text-indigo-200">
            <Building className="w-3.5 h-3.5" /> Institute Administration Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
            Academic Operations & Institute Analytics
          </h2>
          <p className="text-sm text-indigo-100/90 mt-2 leading-relaxed">
            Welcome back, Dr. Alistair Vance. You have 5 active batches running smoothly today with 92.7% institutional attendance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => onNavigate('admin-staff')}
            className="px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Manage Staff
          </button>
          <button
            onClick={() => onNavigate('admin-sms-templates')}
            className="px-4 py-2.5 bg-indigo-700/80 hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl border border-indigo-500/30 transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            SMS Broadcast
          </button>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled Students"
          value={students.length * 28 + 4}
          change="8.4% this term"
          isPositive={true}
          subtitle="Across STEM & Advanced batches"
          icon={GraduationCap}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Active Faculty & Staff"
          value={staff.length}
          subtitle="All departments verified"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Term Fee Collections"
          value={`Rs. ${totalRevenueCollected.toLocaleString()}`}
          change={`Rs. ${pendingRevenue.toLocaleString()} pending`}
          isPositive={false}
          subtitle="94.2% collection rate"
          icon={CreditCard}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Average Attendance"
          value={`${avgAttendance}%`}
          change="2.1% this week"
          isPositive={true}
          subtitle="Monitored daily via QR & manual"
          icon={ClipboardCheck}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Two Column Section: Active Batches & Live Audit Trails */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Batches Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Active Institute Batches & Performance
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current term academic load and enrollment density
              </p>
            </div>
            <button
              onClick={() => onNavigate('admin-academic-year')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Academic Term <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="pb-3 pl-2">Batch / Subject Track</th>
                  <th className="pb-3">Lead Faculty</th>
                  <th className="pb-3 text-center">Students</th>
                  <th className="pb-3 text-center">Avg Attendance</th>
                  <th className="pb-3 text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-slate-900">
                    <div>Batch Alpha (2026) - Advanced Physics</div>
                    <span className="text-[11px] text-slate-400">Mon & Thu (09:00 AM)</span>
                  </td>
                  <td className="py-3.5 text-slate-600">Prof. Sarah Jenkins</td>
                  <td className="py-3.5 text-center font-semibold text-slate-800">32</td>
                  <td className="py-3.5 text-center">
                    <span className="font-semibold text-emerald-600">94.2%</span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <Badge variant="success" dot={true}>Running</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-slate-900">
                    <div>Batch Beta - Pure Calculus & Vectors</div>
                    <span className="text-[11px] text-slate-400">Tue & Fri (11:00 AM)</span>
                  </td>
                  <td className="py-3.5 text-slate-600">Dr. Alistair Vance</td>
                  <td className="py-3.5 text-center font-semibold text-slate-800">28</td>
                  <td className="py-3.5 text-center">
                    <span className="font-semibold text-emerald-600">91.5%</span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <Badge variant="success" dot={true}>Running</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-slate-900">
                    <div>Batch Gamma - Organic & Analytical Chemistry</div>
                    <span className="text-[11px] text-slate-400">Wed & Sat (01:30 PM)</span>
                  </td>
                  <td className="py-3.5 text-slate-600">Dr. Helen Brooks</td>
                  <td className="py-3.5 text-center font-semibold text-slate-800">30</td>
                  <td className="py-3.5 text-center">
                    <span className="font-semibold text-blue-600">89.8%</span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <Badge variant="success" dot={true}>Running</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-slate-900">
                    <div>Batch Delta - Algorithms & Applied AI</div>
                    <span className="text-[11px] text-slate-400">Thu & Sun (03:00 PM)</span>
                  </td>
                  <td className="py-3.5 text-slate-600">Eng. Dev Ray</td>
                  <td className="py-3.5 text-center font-semibold text-slate-800">25</td>
                  <td className="py-3.5 text-center">
                    <span className="font-semibold text-emerald-600">96.0%</span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <Badge variant="success" dot={true}>Running</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Audit Log Stream */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                System Audit Log
              </h3>
              <button
                onClick={() => onNavigate('admin-audit-log')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View Full Log
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {auditLogs.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[160px]">
                      {log.user}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {log.timestamp.split(' ')[1]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {log.action}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium">
                      {log.category}
                    </span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('admin-settings')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors text-center"
            >
              Configure Institute Security & Policies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
