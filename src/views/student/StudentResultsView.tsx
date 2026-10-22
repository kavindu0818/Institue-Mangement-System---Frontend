import React from 'react';
import { Award, Download, TrendingUp, CheckCircle2, Star, Calendar, FileText } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const StudentResultsView: React.FC = () => {
  const { results } = useAppSelector((state) => state.exams);
  const { currentUser } = useAppSelector((state) => state.auth);

  const studentResults = results.filter(
    (r) => r.studentId === currentUser.id || r.studentId === 'stu-1'
  );

  const avgPercentage = (
    studentResults.reduce((acc, r) => acc + r.percentage, 0) / (studentResults.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic Examination Results & Transcripts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screen: "Results" — Official term examination scores, percentiles, and instructor evaluations
          </p>
        </div>

        <button
          onClick={() => alert('Generating verified academic transcript PDF for Alex Morgan...')}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Download Report Card
        </button>
      </div>

      {/* Summary Scorecard Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            Term 3 Performance Overview
          </span>
          <h3 className="text-2xl font-black">Grade Point Average: 3.88 / 4.0</h3>
          <p className="text-xs text-indigo-200">
            Cohort Rank: <strong>#2 of 32 Students</strong> • Percentile: <strong>95.5th</strong>
          </p>
        </div>

        <div className="flex items-center gap-6 divide-x divide-indigo-700/60">
          <div className="text-center px-4">
            <span className="text-[10px] text-indigo-300 uppercase font-bold block">
              Average Score
            </span>
            <span className="text-2xl font-black text-white">{avgPercentage}%</span>
          </div>
          <div className="text-center px-4">
            <span className="text-[10px] text-indigo-300 uppercase font-bold block">
              Exams Graded
            </span>
            <span className="text-2xl font-black text-white">{studentResults.length}</span>
          </div>
          <div className="text-center px-4">
            <span className="text-[10px] text-indigo-300 uppercase font-bold block">
              Academic Standing
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500 text-white mt-1 inline-block">
              Dean's List
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Results List */}
      <div className="space-y-4">
        {studentResults.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {res.subject}
                  </span>
                  <span className="text-xs text-slate-400">Date: {res.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {res.examTitle}
                </h3>

                {res.feedback && (
                  <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl mt-3 leading-relaxed">
                    <strong>Faculty Remark:</strong> "{res.feedback}"
                  </p>
                )}
              </div>

              {/* Score Badges */}
              <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 leading-none">
                    {res.marksObtained}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    /{res.totalMarks}
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-sm">
                  Grade {res.grade} ({res.percentage}%)
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Section Cohort Rank: #{res.rank}</span>
              <button
                onClick={() => alert(`Printing verified transcript for ${res.examTitle}`)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" /> Paper Breakdown
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
