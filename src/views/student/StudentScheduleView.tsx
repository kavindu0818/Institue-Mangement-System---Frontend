import React from 'react';
import { Calendar, Clock, MapPin, Users, BookOpen } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const StudentScheduleView: React.FC = () => {
  const { sessions } = useAppSelector((state) => state.schedule);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          My Academic Lecture & Lab Timetable
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Weekly schedule for Grade 12 STEM (Batch Alpha) • Scan your ID pass upon entering the hall
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-2xl border-l-4 border-y border-r border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            style={{
              borderLeftColor: session.status === 'Live' ? '#10b981' : '#4f46e5',
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {session.dayOfWeek}
                </span>
                <Badge
                  variant={
                    session.status === 'Live'
                      ? 'success'
                      : session.status === 'Completed'
                      ? 'neutral'
                      : 'info'
                  }
                  size="sm"
                  dot={session.status === 'Live'}
                >
                  {session.status}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-2.5">
                {session.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                {session.subject}
              </p>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">
                    {session.startTime} – {session.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{session.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Faculty: {session.teacherName}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>90 mins lecture</span>
              <span className="text-emerald-600 font-semibold">Attendance Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
