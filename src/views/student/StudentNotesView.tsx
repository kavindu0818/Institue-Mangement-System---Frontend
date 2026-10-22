import React, { useState } from 'react';
import { FileText, Plus, Trash2, Search, Tag, Calendar, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addStudentNote, deleteStudentNote } from '../../store/materialsSlice';
import { Modal } from '../../components/common/Modal';

export const StudentNotesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { studentNotes } = useAppSelector((state) => state.materials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // New Note state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Quantum Physics');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Physics, Formulas');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    dispatch(
      addStudentNote({
        title,
        subject,
        content,
        tags,
      })
    );
    setIsModalOpen(false);
    setTitle('');
    setContent('');
  };

  const filteredNotes = studentNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Personal Study Notebook & Flash Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screen: "New note" — Keep key formulas, lecture notes, and revision hints organized by subject
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search formulas, concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white shadow-sm"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {note.subject}
                </span>
                <button
                  onClick={() => dispatch(deleteStudentNote(note.id))}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
                {note.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2 whitespace-pre-line leading-relaxed font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                {note.content}
              </p>

              <div className="mt-4 flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Created on: {note.date}
            </div>
          </div>
        ))}
      </div>

      {/* New Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Study Note"
        description="Figma Component: 'New note' — Save formula derivations and lecture summaries."
        maxWidth="md"
      >
        <form onSubmit={handleAddNote} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wave Mechanics & Potential Well Equations"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
              Content & Mathematical Equations *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Write formulas, shortcuts, and reminder steps..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Physics, Exam-Prep, Formulas"
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
              Save Note
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
