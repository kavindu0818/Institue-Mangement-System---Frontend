import React, { useState } from 'react';
import { Award, Plus, Calendar, Clock, MapPin, Check, Edit2, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addExam, updateExamMarks } from '../../store/examsSlice';
import { Exam, ExamResult } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const ExamsAndMarksView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { exams, results } = useAppSelector((state) => state.exams);
  const { students } = useAppSelector((state) => state.attendance);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);

  // New Exam Form
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Quantum Physics');
  const [newBatch, setNewBatch] = useState('Batch Alpha (2026)');
  const [newDate, setNewDate] = useState('2026-11-12');
  const [newTime, setNewTime] = useState('09:00 AM');
  const [newDuration, setNewDuration] = useState(120);
  const [newTotalMarks, setNewTotalMarks] = useState(100);
  const [newPassingMarks, setNewPassingMarks] = useState(40);
  const [newRoom, setNewRoom] = useState('Hall B-201');

  // Grading form
  const [gradeStudentId, setGradeStudentId] = useState('stu-1');
  const [gradeMarks, setGradeMarks] = useState(90);
  const [gradeFeedback, setGradeFeedback] = useState('Good performance');

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    dispatch(
      addExam({
        title: newTitle,
        subject: newSubject,
        batch: newBatch,
        date: newDate,
        startTime: newTime,
        durationMinutes: Number(newDuration),
        totalMarks: Number(newTotalMarks),
        passingMarks: Number(newPassingMarks),
        room: newRoom,
        status: 'Upcoming',
      })
    );
    setIsCreateModalOpen(false);
    setNewTitle('');
  };

  const handleOpenGrading = (exam: Exam) => {
    setActiveExam(exam);
    setIsGradeModalOpen(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExam) return;

    const student = students.find((s) => s.id === gradeStudentId);
    const marks = Number(gradeMarks);
    const percentage = Math.round((marks / activeExam.totalMarks) * 100);
    const gradeLetter =
      percentage >= 90
        ? 'A+'
        : percentage >= 80
        ? 'A'
        : percentage >= 70
        ? 'B'
        : percentage >= 60
        ? 'C'
        : 'F';

    dispatch(
      updateExamMarks({
        id: `res-${Date.now()}`,
        examId: activeExam.id,
        examTitle: activeExam.title,
        studentId: gradeStudentId,
        studentName: student ? student.name : 'Alex Morgan',
        subject: activeExam.subject,
        marksObtained: marks,
        totalMarks: activeExam.totalMarks,
        grade: gradeLetter,
        percentage,
        rank: 1,
        feedback: gradeFeedback,
        date: new Date().toISOString().split('T')[0],
      })
    );
    setIsGradeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Examinations & Marks Registry
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screens: "Create exam" & "Exams & marks" — Formulate question papers, datesheets, and student scoring
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Exam
        </button>
      </div>

      {/* Exams Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {exams.map((exam) => {
          const examResults = results.filter((r) => r.examId === exam.id);

          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {exam.subject}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-slate-500">{exam.batch}</p>
                  </div>
                  <Badge variant={exam.status === 'Graded' ? 'success' : 'info'} dot={true}>
                    {exam.status}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exam.startTime} ({exam.durationMinutes}m)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exam.room}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Max Marks: {exam.totalMarks}</span>
                  </div>
                </div>

                {examResults.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                      Submissions Graded ({examResults.length})
                    </p>
                    <div className="space-y-1">
                      {examResults.slice(0, 2).map((res) => (
                        <div
                          key={res.id}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50"
                        >
                          <span className="font-medium text-slate-800">{res.studentName}</span>
                          <span className="font-bold text-indigo-600">
                            {res.marksObtained}/{res.totalMarks} ({res.grade})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => handleOpenGrading(exam)}
                  className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Grade Students & Marks
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Exam Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Examination"
        description="Figma Component: 'Create exam' — Define test title, subject, venue, and mark distribution."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateExam} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Examination Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 4 Thermodynamics & Statistical Mechanics Test"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject
              </label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Quantum Physics">Quantum Physics</option>
                <option value="Pure Mathematics">Pure Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Batch
              </label>
              <select
                value={newBatch}
                onChange={(e) => setNewBatch(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Batch Alpha (2026)">Batch Alpha (2026)</option>
                <option value="Batch Beta (2026)">Batch Beta (2026)</option>
                <option value="Batch Gamma (2026)">Batch Gamma (2026)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Exam Date
              </label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start Time
              </label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="09:00 AM"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Duration (Mins)
              </label>
              <input
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Marks
              </label>
              <input
                type="number"
                value={newTotalMarks}
                onChange={(e) => setNewTotalMarks(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Passing Marks
              </label>
              <input
                type="number"
                value={newPassingMarks}
                onChange={(e) => setNewPassingMarks(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Room / Venue
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

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20"
            >
              Save & Schedule Exam
            </button>
          </div>
        </form>
      </Modal>

      {/* Grade Students Modal */}
      <Modal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
        title={`Enter Student Marks: ${activeExam?.title || ''}`}
        description="Figma Component: 'Exams & marks' — Record marks and teacher feedback for report cards."
        maxWidth="md"
      >
        <form onSubmit={handleSaveGrade} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Student
            </label>
            <select
              value={gradeStudentId}
              onChange={(e) => setGradeStudentId(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Marks Obtained (Max: {activeExam?.totalMarks || 100})
            </label>
            <input
              type="number"
              min="0"
              max={activeExam?.totalMarks || 100}
              required
              value={gradeMarks}
              onChange={(e) => setGradeMarks(Number(e.target.value))}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teacher Feedback / Performance Remark
            </label>
            <textarea
              rows={3}
              value={gradeFeedback}
              onChange={(e) => setGradeFeedback(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Commend mastery of topics or highlight improvement areas..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsGradeModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20"
            >
              Record Grade & Publish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
