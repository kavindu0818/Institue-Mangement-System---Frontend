import React from 'react';
import { Award, Download, TrendingUp, Star, FileText } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const ParentResultsView: React.FC = () => {
  const { results } = useAppSelector((state) => state.exams);

  const childResults = results.filter((r) => r.studentId === 'stu-1');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Child Performance & Term Examination Results
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screen: "Results" — Academic progress, subject rankings, and teacher assessments for Alex Morgan
          </p>
        </div>

        <button
          onClick={() => alert('Downloading official stamped report card for Alex Morgan...')}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Download Stamped Report Card
        </button>
      </div>

      <div className="space-y-4">
        {childResults.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                    {res.subject}
                  </span>
                  <span className="text-xs text-slate-400">Date: {res.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {res.examTitle}
                </h3>

                {res.feedback && (
                  <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl mt-3 leading-relaxed">
                    <strong>Teacher Feedback:</strong> "{res.feedback}"
                  </p>
                )}
              </div>

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
              <span>Section Ranking: #{res.rank}</span>
              <span className="text-emerald-600 font-semibold">Passed with Distinction</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
