import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, BookOpen, Plus, CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setSelectedDay, addSession } from '../../store/scheduleSlice';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const TeacherScheduleView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sessions, selectedDay } = useAppSelector((state) => state.schedule);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Quantum Physics');
  const [newBatch, setNewBatch] = useState('Batch Alpha (2026)');
  const [newDay, setNewDay] = useState('Monday');
  const [newStart, setNewStart] = useState('09:00 AM');
  const [newEnd, setNewEnd] = useState('10:30 AM');
  const [newRoom, setNewRoom] = useState('Hall B-201');

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSessions = sessions.filter((s) => {
    const matchesDay = selectedDay === 'All' || s.dayOfWeek === selectedDay;
    return matchesDay;
  });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    dispatch(
      addSession({
        title: newTitle,
        subject: newSubject,
        teacherName: currentUser.name,
        teacherId: currentUser.id,
        batch: newBatch,
        dayOfWeek: newDay,
        startTime: newStart,
        endTime: newEnd,
        room: newRoom,
        status: 'Upcoming',
        color: 'border-l-indigo-600 bg-indigo-50/60 text-indigo-900',
      })
    );
    setIsModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Weekly Class & Lecture Timetable
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screen: "Schedule screen" — Interactive weekly timetable across laboratory and theory halls
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Schedule Slot
        </button>
      </div>

      {/* Days Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => dispatch(setSelectedDay(day))}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-2xl border-l-4 border-y border-r border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            style={{
              borderLeftColor: session.status === 'Live' ? '#10b981' : '#4f46e5',
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
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

              <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
                {session.title}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                {session.subject} • {session.batch}
              </p>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-800">
                    {session.startTime} – {session.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{session.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Instructor: {session.teacherName}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Duration: 90 mins</span>
              <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
                Class Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Slot Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Schedule Time Slot"
        description="Figma Component: 'Schedule screen' — Reserve class hall, day and teaching duration."
        maxWidth="md"
      >
        <form onSubmit={handleAddClass} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lecture Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Statistical Mechanics Lab"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Day of Week
              </label>
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Room
              </label>
              <input
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                placeholder="Hall B-201"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start Time
              </label>
              <input
                type="text"
                value={newStart}
                onChange={(e) => setNewStart(e.target.value)}
                placeholder="09:00 AM"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                End Time
              </label>
              <input
                type="text"
                value={newEnd}
                onChange={(e) => setNewEnd(e.target.value)}
                placeholder="10:30 AM"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20"
            >
              Add To Timetable
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
