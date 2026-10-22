import React, { useState } from 'react';
import { UploadCloud, FileText, Video, Link, Trash2, Download, Search, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { uploadMaterial, deleteMaterial, setMaterialSubjectFilter } from '../../store/materialsSlice';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const MaterialsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { materials, filterSubject } = useAppSelector((state) => state.materials);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Upload Form
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Quantum Physics');
  const [batch, setBatch] = useState('Batch Alpha (2026)');
  const [fileType, setFileType] = useState<'pdf' | 'doc' | 'video' | 'link'>('pdf');
  const [fileSize, setFileSize] = useState('3.4 MB');

  const subjects = ['All', 'Quantum Physics', 'Pure Mathematics', 'Chemistry', 'Computer Science'];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    dispatch(
      uploadMaterial({
        title,
        subject,
        batch,
        uploadedBy: currentUser.name,
        fileSize,
        fileType,
        downloadUrl: '#',
      })
    );
    setIsModalOpen(false);
    setTitle('');
  };

  const filteredMaterials = materials.filter((m) => {
    const matchesSubject = filterSubject === 'All' || m.subject === filterSubject;
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Curriculum Resources & Study Materials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screens: "Materials" & "Upload material" — Share lecture presentations, worksheets, and lab guidelines
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          Upload Material
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search slides, documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => dispatch(setMaterialSubjectFilter(sub))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterSubject === sub
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  {item.fileType === 'pdf' ? (
                    <FileText className="w-5 h-5" />
                  ) : item.fileType === 'video' ? (
                    <Video className="w-5 h-5" />
                  ) : (
                    <Link className="w-5 h-5" />
                  )}
                </div>
                <Badge variant="purple" size="sm">
                  {item.fileType.toUpperCase()}
                </Badge>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-3 leading-snug line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs font-medium text-indigo-600 mt-1">
                {item.subject} • {item.batch}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>By: {item.uploadedBy}</span>
                <span>{item.fileSize}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Date: {item.uploadDate}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => alert(`Downloading: ${item.title}`)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                {currentUser.role === 'teacher' && (
                  <button
                    onClick={() => dispatch(deleteMaterial(item.id))}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Material Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Teaching Material"
        description="Figma Component: 'Upload material' — Publish class notes, assignments, or lab recordings."
        maxWidth="md"
      >
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Material Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 6 Optics & Wave Interference Worksheet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                Batch
              </label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Batch Alpha (2026)">Batch Alpha (2026)</option>
                <option value="Batch Beta (2026)">Batch Beta (2026)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                File Type
              </label>
              <select
                value={fileType}
                onChange={(e) =>
                  setFileType(e.target.value as 'pdf' | 'doc' | 'video' | 'link')
                }
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="pdf">PDF Document</option>
                <option value="doc">Word / Text Doc</option>
                <option value="video">Video Recording</option>
                <option value="link">Web Resource Link</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Simulated File Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Drag & Drop Simulation Box */}
          <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-indigo-400 bg-slate-50/50 cursor-pointer transition-colors">
            <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto" />
            <p className="text-xs font-semibold text-slate-700 mt-2">
              Click to select file or drop here
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Supports PDF, MP4, DOCX up to 250MB
            </p>
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
              Publish Resource
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
