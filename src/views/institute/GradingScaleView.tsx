import React, { useState } from 'react';
import { Sliders, Award, Edit2, Check, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateGradingScaleItem } from '../../store/instituteSlice';
import { GradingScaleItem } from '../../types';
import { Modal } from '../../components/common/Modal';

export const GradingScaleView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gradingScale } = useAppSelector((state) => state.institute);

  const [selectedItem, setSelectedItem] = useState<GradingScaleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editGrade, setEditGrade] = useState('');
  const [editMin, setEditMin] = useState(0);
  const [editMax, setEditMax] = useState(100);
  const [editGpa, setEditGpa] = useState(4.0);
  const [editDesc, setEditDesc] = useState('');

  const handleOpenEdit = (item: GradingScaleItem) => {
    setSelectedItem(item);
    setEditGrade(item.grade);
    setEditMin(item.minPercentage);
    setEditMax(item.maxPercentage);
    setEditGpa(item.gradePoint);
    setEditDesc(item.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    dispatch(
      updateGradingScaleItem({
        id: selectedItem.id,
        grade: editGrade,
        minPercentage: Number(editMin),
        maxPercentage: Number(editMax),
        gradePoint: Number(editGpa),
        description: editDesc,
      })
    );
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Institutional Grading Scale & Honors Framework
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure grade boundaries, letter designations, grade point averages (GPA), and honors thresholds
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Standard 4.0 GPA Academic Scale
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Active for all 2026 examination calculations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 pl-6">Letter Grade</th>
                <th className="py-3.5">Percentage Range</th>
                <th className="py-3.5">GPA Equivalent</th>
                <th className="py-3.5">Performance Mastery</th>
                <th className="py-3.5 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gradingScale.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pl-6">
                    <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-sm flex items-center justify-center border border-indigo-200/60">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-slate-800">
                    {item.minPercentage}% – {item.maxPercentage}%
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md text-xs">
                      {item.gradePoint.toFixed(1)} / 4.0
                    </span>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    {item.description}
                  </td>
                  <td className="py-4 pr-6 text-right">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Scale
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Scale Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Edit Grade Boundary (${editGrade})`}
        description="Modify percentage intervals and GPA conversion factor."
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grade Letter
              </label>
              <input
                type="text"
                required
                value={editGrade}
                onChange={(e) => setEditGrade(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GPA Points (0.0 - 4.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4.0"
                required
                value={editGpa}
                onChange={(e) => setEditGpa(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Min Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={editMin}
                onChange={(e) => setEditMin(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={editMax}
                onChange={(e) => setEditMax(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Performance Description
            </label>
            <input
              type="text"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
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
              Save Grade Threshold
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
