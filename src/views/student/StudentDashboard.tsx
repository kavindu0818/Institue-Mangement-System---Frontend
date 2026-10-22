import React from 'react';
import {
  GraduationCap,
  QrCode,
  Award,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  FileText,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { useAppSelector } from '../../store';

interface StudentDashboardProps {
  onNavigate: (view: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { sessions } = useAppSelector((state) => state.schedule);
  const { results } = useAppSelector((state) => state.exams);
  const { studentNotes } = useAppSelector((state) => state.materials);

  const studentResults = results.filter((r) => r.studentId === currentUser.id || r.studentId === 'stu-1');

  return (
    <div className="space-y-6">
      {/* Student Hero Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-semibold tracking-wide uppercase text-emerald-200">
            <GraduationCap className="w-3.5 h-3.5" /> Student Academic Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
            Hi, {currentUser.name}! 🚀
          </h2>
          <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Batch Alpha (Grade 12 STEM). You are ranked <strong>#2</strong> in your cohort with an outstanding <strong>3.88 GPA</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mt-5 sm:mt-0 relative z-10">
          <button
            onClick={() => onNavigate('student-qr')}
            className="px-4 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-emerald-600" />
            My Digital QR Pass
          </button>
          <button
            onClick={() => onNavigate('student-results')}
            className="px-4 py-2.5 bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm rounded-xl border border-emerald-400/30 transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            View Results
          </button>
        </div>

        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Cumulative GPA"
          value="3.88 / 4.0"
          change="Top 5% Tier"
          isPositive={true}
          subtitle="Honors distinction"
          icon={Award}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Attendance Rate"
          value="94.2%"
          change="Compliant"
          isPositive={true}
          subtitle="Above 85% requirement"
          icon={TrendingUp}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Enrolled Subjects"
          value="4"
          subtitle="STEM Specialization"
          icon={BookOpen}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Personal Study Notes"
          value={studentNotes.length}
          subtitle="In your study notebook"
          icon={FileText}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Two Column Section: Upcoming Classes & Recent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Upcoming Lectures & Labs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Scan your QR code upon entering the designated lecture hall
              </p>
            </div>
            <button
              onClick={() => onNavigate('student-schedule')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              Full Schedule <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3.5">
            {sessions.slice(0, 3).map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-sm bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {session.title}
                    </span>
                    <Badge variant={session.status === 'Live' ? 'success' : 'info'} size="sm">
                      {session.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-1">
                    {session.subject} • Instructor: {session.teacherName}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {session.startTime} - {session.endTime} ({session.dayOfWeek})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {session.room}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('student-qr')}
                  className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <QrCode className="w-4 h-4" /> Scan Pass
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Exam Results */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Recent Exam Marks
              </h3>
              <button
                onClick={() => onNavigate('student-results')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {studentResults.slice(0, 3).map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[160px]">
                      {res.examTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{res.subject}</p>
                    <span className="text-[10px] text-slate-400">{res.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-600 block">
                      {res.marksObtained}/{res.totalMarks}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      Grade: {res.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('student-notes')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors text-center"
            >
              Open Personal Study Notebook 📓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
