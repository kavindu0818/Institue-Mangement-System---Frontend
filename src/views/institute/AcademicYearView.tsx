import React, { useState } from 'react';
import { CalendarRange, Plus, CheckCircle2, Calendar, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addAcademicYear, setActiveAcademicYear } from '../../store/instituteSlice';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const AcademicYearView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { academicYears } = useAppSelector((state) => state.institute);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [currentTerm, setCurrentTerm] = useState('Term 1 (Fall Session)');
  const [startDate, setStartDate] = useState('2027-09-01');
  const [endDate, setEndDate] = useState('2028-06-30');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    dispatch(
      addAcademicYear({
        id: `ay-${Date.now()}`,
        name,
        currentTerm,
        startDate,
        endDate,
        isActive: false,
      })
    );
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic Calendar & Year Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Define institutional sessions, terms, semester intervals, and active term switches
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Academic Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {academicYears.map((ay) => (
          <div
            key={ay.id}
            className={`bg-white rounded-2xl border p-6 shadow-sm transition-all relative overflow-hidden ${
              ay.isActive
                ? 'border-indigo-400 ring-2 ring-indigo-500/10'
                : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            {ay.isActive && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active Session
              </div>
            )}

            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  ay.isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <CalendarRange className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">{ay.name}</h3>
                <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                  {ay.currentTerm}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Session Starts
                    </span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">
                      {ay.startDate}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Session Ends
                    </span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">
                      {ay.endDate}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Badge variant={ay.isActive ? 'success' : 'neutral'} dot={true}>
                    {ay.isActive ? 'Enrolling & Active' : 'Archived Term'}
                  </Badge>

                  {!ay.isActive && (
                    <button
                      onClick={() => dispatch(setActiveAcademicYear(ay.id))}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Make Active Session
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Academic Session Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Academic Year"
        description="Configure new institutional session dates and academic term nomenclature."
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Academic Year Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Academic Year 2027 - 2028"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Active Initial Term
            </label>
            <input
              type="text"
              value={currentTerm}
              onChange={(e) => setCurrentTerm(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="Term 1 (Fall Session)"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
              Create Academic Year
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
