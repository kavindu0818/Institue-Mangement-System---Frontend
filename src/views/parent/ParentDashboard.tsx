import React from 'react';
import {
  Users,
  Award,
  CreditCard,
  ClipboardCheck,
  Calendar,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { useAppSelector } from '../../store';

interface ParentDashboardProps {
  onNavigate: (view: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { students } = useAppSelector((state) => state.attendance);
  const { invoices } = useAppSelector((state) => state.fees);
  const { results, exams } = useAppSelector((state) => state.exams);

  const child = students.find((s) => s.id === 'stu-1') || students[0];
  const pendingInvoice = invoices.find((inv) => inv.studentId === child.id && inv.status !== 'Paid');
  const recentResult = results.find((r) => r.studentId === child.id);
  const nextExam = exams.find((e) => e.status === 'Upcoming');

  return (
    <div className="space-y-6">
      {/* Parent Hero Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-950/20 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-semibold tracking-wide uppercase text-purple-200">
            <Users className="w-3.5 h-3.5" /> Parent Supervision Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
            Welcome, {currentUser.name}
          </h2>
          <p className="text-sm text-purple-100/90 mt-2 leading-relaxed">
            Monitoring progress for: <strong className="text-white underline decoration-purple-400">{child.name}</strong> ({child.grade}). Overall attendance is strong at <strong>{child.attendanceRate}%</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mt-5 sm:mt-0 relative z-10">
          <button
            onClick={() => onNavigate('parent-fees')}
            className="px-4 py-2.5 bg-white text-purple-950 hover:bg-purple-50 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-purple-600" />
            Manage Child Fees
          </button>
          <button
            onClick={() => onNavigate('parent-messages')}
            className="px-4 py-2.5 bg-purple-700/80 hover:bg-purple-600 text-white font-semibold text-xs sm:text-sm rounded-xl border border-purple-400/30 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Message Faculty
          </button>
        </div>

        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Child's GPA"
          value={`${child.overallGpa} / 4.0`}
          change="Top Rank #2"
          isPositive={true}
          subtitle="Honors standing"
          icon={Award}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Attendance Record"
          value={`${child.attendanceRate}%`}
          change="Verified"
          isPositive={true}
          subtitle="QR Gate synced daily"
          icon={ClipboardCheck}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Fee Status"
          value={pendingInvoice ? `Rs. ${pendingInvoice.amount.toLocaleString()}` : 'All Cleared'}
          change={pendingInvoice ? 'Due Nov 15' : 'No dues'}
          isPositive={!pendingInvoice}
          subtitle={pendingInvoice ? pendingInvoice.title : 'All invoices paid'}
          icon={CreditCard}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Next Scheduled Exam"
          value="Nov 05"
          subtitle={nextExam ? nextExam.title : 'Quantum Mechanics'}
          icon={Calendar}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
      </div>

      {/* Two Column Layout: Academic Updates & Urgent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Updates & Recent Marks */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Latest Academic Results & Teacher Notes
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluations submitted by course instructors for {child.name}
              </p>
            </div>
            <button
              onClick={() => onNavigate('parent-results')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1"
            >
              Full Report <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3.5">
            {recentResult && (
              <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">
                    {recentResult.examTitle}
                  </span>
                  <Badge variant="success" size="sm">
                    {recentResult.grade} ({recentResult.percentage}%)
                  </Badge>
                </div>
                <p className="text-xs text-purple-800 font-medium mt-1">
                  Subject: {recentResult.subject} • Scored: {recentResult.marksObtained}/{recentResult.totalMarks}
                </p>
                {recentResult.feedback && (
                  <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-purple-100 mt-2 italic">
                    "{recentResult.feedback}"
                  </p>
                )}
              </div>
            )}

            <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Daily Attendance Log ({new Date().toISOString().split('T')[0]})
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quantum Physics lecture at 09:00 AM • Hall B-201
                </p>
              </div>
              <Badge variant="success" dot={true}>
                Present & On-Time
              </Badge>
            </div>
          </div>
        </div>

        {/* Parent Quick Links & Direct Message Prompt */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Parent Support & Actions
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => onNavigate('parent-fees')}
              className="w-full p-3 rounded-xl bg-purple-50 hover:bg-purple-100/70 border border-purple-100 text-left transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-purple-950">Pay Tuition Fees</p>
                <p className="text-[11px] text-purple-700">Online card / bank transfer</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('parent-messages')}
              className="w-full p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-100 text-left transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-950">Teacher Direct Chat</p>
                <p className="text-[11px] text-indigo-700">Discuss progress with faculty</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('parent-schedule')}
              className="w-full p-3 rounded-xl bg-blue-50 hover:bg-blue-100/70 border border-blue-100 text-left transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-950">Exam & Class Datesheet</p>
                <p className="text-[11px] text-blue-700">Upcoming test dates & rooms</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
