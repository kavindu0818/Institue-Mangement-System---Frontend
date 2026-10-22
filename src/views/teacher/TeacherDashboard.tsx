import React from 'react';
import {
  Calendar,
  Users,
  Award,
  ClipboardCheck,
  ArrowRight,
  BookOpen,
  UploadCloud,
  BellPlus,
  MessageSquare,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { useAppSelector } from '../../store';

interface TeacherDashboardProps {
  onNavigate: (view: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { sessions } = useAppSelector((state) => state.schedule);
  const { students, records } = useAppSelector((state) => state.attendance);
  const { exams } = useAppSelector((state) => state.exams);

  const teacherSessions = sessions.filter((s) => s.teacherId === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Teacher Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-950/20 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold tracking-wide uppercase text-blue-200">
            <BookOpen className="w-3.5 h-3.5" /> Faculty Command Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
            Welcome, {currentUser.name}
          </h2>
          <p className="text-sm text-blue-100/90 mt-2 leading-relaxed">
            You have 2 scheduled lectures today. Next session: <strong>Advanced Quantum Mechanics</strong> at 09:00 AM in Hall B-201.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mt-5 sm:mt-0 relative z-10">
          <button
            onClick={() => onNavigate('teacher-attendance')}
            className="px-4 py-2.5 bg-white text-blue-950 hover:bg-blue-50 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <ClipboardCheck className="w-4 h-4 text-blue-600" />
            Mark Today's Attendance
          </button>
          <button
            onClick={() => onNavigate('teacher-exams')}
            className="px-4 py-2.5 bg-blue-700/80 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-xl border border-blue-400/30 transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            Create Exam
          </button>
        </div>

        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Classes This Week"
          value={teacherSessions.length || 4}
          subtitle="Physics & Quantum mechanics"
          icon={Calendar}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Assigned Students"
          value={students.length * 12}
          change="+4 new joins"
          isPositive={true}
          subtitle="Across Alpha & Beta batches"
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Exams Created"
          value={exams.length}
          subtitle="1 pending grading review"
          icon={Award}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Batch Attendance Rate"
          value="94.2%"
          change="Consistent"
          isPositive={true}
          subtitle="Daily register synced"
          icon={ClipboardCheck}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
      </div>

      {/* Two Column Layout: Today's Lectures & Quick Launch Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Lectures List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Today's Assigned Lecture Schedule
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review class locations, batches, and launch attendance registers
              </p>
            </div>
            <button
              onClick={() => onNavigate('teacher-schedule')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Full Timetable <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3.5">
            {teacherSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-sm bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {session.title}
                    </span>
                    <Badge variant={session.status === 'Completed' ? 'neutral' : 'info'} size="sm">
                      {session.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-1">
                    {session.batch} • {session.subject}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {session.startTime} - {session.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {session.room}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('teacher-attendance')}
                    className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" /> Attendance
                  </button>
                  <button
                    onClick={() => onNavigate('teacher-chat')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Class Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch Cards */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Teaching Shortcuts
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => onNavigate('teacher-attendance')}
              className="w-full p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-100 text-left transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-950">Manual Attendance</p>
                <p className="text-[11px] text-indigo-700">1-click student status marking</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('teacher-materials')}
              className="w-full p-3 rounded-xl bg-blue-50 hover:bg-blue-100/70 border border-blue-100 text-left transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-950">Upload Study Material</p>
                <p className="text-[11px] text-blue-700">PDFs, Slides & Lab Sheets</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('teacher-announcements')}
              className="w-full p-3 rounded-xl bg-purple-50 hover:bg-purple-100/70 border border-purple-100 text-left transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                <BellPlus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-purple-950">New Announcement</p>
                <p className="text-[11px] text-purple-700">Post notice to class or parents</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('teacher-chat')}
              className="w-full p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-100 text-left transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">Class Discussion Chat</p>
                <p className="text-[11px] text-emerald-700">Answer student questions live</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
