import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Users,
  Search,
  Save,
  Sparkles,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  setAttendanceStatus,
  markAllPresent,
  setSelectedDate,
  setSelectedBatch,
} from '../../store/attendanceSlice';
import { Badge } from '../../components/common/Badge';

export const ManualAttendanceView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, records, selectedDate, selectedBatch } = useAppSelector(
    (state) => state.attendance
  );

  const [subject, setSubject] = useState('Quantum Physics');
  const [search, setSearch] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleStatusChange = (
    studentId: string,
    status: 'Present' | 'Absent' | 'Late' | 'Excused'
  ) => {
    dispatch(
      setAttendanceStatus({
        studentId,
        date: selectedDate,
        subject,
        status,
      })
    );
  };

  const handleMarkAll = () => {
    dispatch(markAllPresent({ subject, date: selectedDate }));
  };

  const handleSaveBatch = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate current counts
  const currentStatuses = students.map((s) => {
    const rec = records.find(
      (r) => r.studentId === s.id && r.date === selectedDate && r.subject === subject
    );
    return rec ? rec.status : 'Present';
  });

  const presentCount = currentStatuses.filter((st) => st === 'Present').length;
  const absentCount = currentStatuses.filter((st) => st === 'Absent').length;
  const lateCount = currentStatuses.filter((st) => st === 'Late').length;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Manual Student Attendance Register
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screen: "Attendance manually marked" — Select batch, date, and toggle student presence
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleMarkAll}
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            Mark All Present
          </button>
          <button
            onClick={handleSaveBatch}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save Attendance
          </button>
        </div>
      </div>

      {showSavedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold text-emerald-900">
            Attendance register for {selectedDate} saved and synced to Student & Parent portals!
          </p>
        </div>
      )}

      {/* Filter Toolbar & Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => dispatch(setSelectedDate(e.target.value))}
            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Assigned Batch
          </label>
          <select
            value={selectedBatch}
            onChange={(e) => dispatch(setSelectedBatch(e.target.value))}
            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="Batch Alpha (2026)">Batch Alpha (2026)</option>
            <option value="Batch Beta (2026)">Batch Beta (2026)</option>
            <option value="Batch Gamma (2026)">Batch Gamma (2026)</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Subject Track
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="Quantum Physics">Quantum Physics</option>
            <option value="Pure Mathematics">Pure Mathematics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-around">
          <div className="text-center">
            <span className="text-[10px] font-bold text-emerald-600 uppercase block">Present</span>
            <span className="text-xl font-bold text-slate-900">{presentCount}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-rose-600 uppercase block">Absent</span>
            <span className="text-xl font-bold text-slate-900">{absentCount}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-amber-600 uppercase block">Late</span>
            <span className="text-xl font-bold text-slate-900">{lateCount}</span>
          </div>
        </div>
      </div>

      {/* Student Attendance Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or roll..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <span className="text-xs text-slate-500">
            Total {filteredStudents.length} Students in Register
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 pl-6">Roll No</th>
                <th className="py-3.5">Student Name</th>
                <th className="py-3.5">Overall Attendance</th>
                <th className="py-3.5">Marked Status ({selectedDate})</th>
                <th className="py-3.5 pr-6 text-right">Quick Mark Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const existing = records.find(
                  (r) =>
                    r.studentId === student.id &&
                    r.date === selectedDate &&
                    r.subject === subject
                );
                const currentStatus = existing ? existing.status : 'Present';

                return (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pl-6 font-mono text-xs font-semibold text-slate-500">
                      {student.rollNumber}
                    </td>
                    <td className="py-3.5 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">
                            {student.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{student.grade}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 font-semibold text-slate-700">
                      {student.attendanceRate}%
                    </td>
                    <td className="py-3.5">
                      <Badge
                        variant={
                          currentStatus === 'Present'
                            ? 'success'
                            : currentStatus === 'Absent'
                            ? 'danger'
                            : currentStatus === 'Late'
                            ? 'warning'
                            : 'neutral'
                        }
                        dot={true}
                      >
                        {currentStatus}
                      </Badge>
                    </td>
                    <td className="py-3.5 pr-6 text-right">
                      <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <button
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-200/60'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-rose-700 hover:bg-slate-200/60'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                            currentStatus === 'Late'
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-amber-700 hover:bg-slate-200/60'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
