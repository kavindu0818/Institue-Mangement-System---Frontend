import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Award, BookOpen } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const ParentScheduleView: React.FC = () => {
  const { sessions } = useAppSelector((state) => state.schedule);
  const { exams } = useAppSelector((state) => state.exams);
  const [activeTab, setActiveTab] = useState<'classes' | 'exams'>('classes');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Class Timetable & Examination Datesheet
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screens: "Schedule" & "Exam schedule" — Weekly lecture commitments and upcoming mid-term dates
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-sm">
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'classes'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Class Schedule
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'exams'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Exam Datesheet
          </button>
        </div>
      </div>

      {activeTab === 'classes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {session.dayOfWeek}
                  </span>
                  <Badge variant={session.status === 'Completed' ? 'neutral' : 'info'} size="sm">
                    {session.status}
                  </Badge>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2.5">
                  {session.title}
                </h3>
                <p className="text-xs font-semibold text-purple-600 mt-0.5">
                  {session.subject}
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{session.startTime} - {session.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{session.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Teacher: {session.teacherName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {exam.subject}
                </span>
                <Badge variant={exam.status === 'Graded' ? 'success' : 'info'} size="sm">
                  {exam.status}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-2">
                {exam.title}
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="p-2 rounded-lg bg-slate-50 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date: {exam.date}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exam.startTime} ({exam.durationMinutes}m)</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Venue: {exam.room}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  <span>Total Marks: {exam.totalMarks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
