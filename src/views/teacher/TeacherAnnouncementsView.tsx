import React, { useState } from 'react';
import { BellRing, Plus, Pin, Trash2, Users, Search, Megaphone } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addAnnouncement,
  deleteAnnouncement,
  togglePinAnnouncement,
  setFilterAudience,
} from '../../store/announcementsSlice';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const TeacherAnnouncementsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { announcements, filterAudience } = useAppSelector((state) => state.announcements);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState<'All' | 'Students' | 'Parents' | 'Teachers'>('Students');
  const [priority, setPriority] = useState<'High' | 'Normal' | 'Low'>('Normal');
  const [pinned, setPinned] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    dispatch(
      addAnnouncement({
        title,
        content,
        author: currentUser.name,
        authorRole: currentUser.role,
        targetAudience,
        priority,
        pinned,
      })
    );
    setIsModalOpen(false);
    setTitle('');
    setContent('');
  };

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesAudience = filterAudience === 'All' || a.targetAudience === filterAudience || a.targetAudience === 'All';
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    return matchesAudience && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Broadcast Announcements & Notices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screens: "Announcements" & "New announcement" — Publish class reminders, lab changes, and general notices
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Students', 'Parents', 'Teachers'].map((aud) => (
            <button
              key={aud}
              onClick={() => dispatch(setFilterAudience(aud))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterAudience === aud
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
              ann.pinned
                ? 'border-indigo-400 ring-2 ring-indigo-500/10'
                : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {ann.pinned && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <Badge
                  variant={
                    ann.priority === 'High'
                      ? 'danger'
                      : ann.priority === 'Normal'
                      ? 'info'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {ann.priority} Priority
                </Badge>
                <span className="text-xs text-slate-400">• Audience: {ann.targetAudience}</span>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={() => dispatch(togglePinAnnouncement(ann.id))}
                  className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Toggle Pin"
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => dispatch(deleteAnnouncement(ann.id))}
                  className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-2.5">{ann.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {ann.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>
                Posted by: <strong className="text-slate-700 font-semibold">{ann.author}</strong>
              </span>
              <span>{ann.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Compose New Announcement"
        description="Figma Component: 'New announcement' — Broadcast notice to students, parents, or staff."
        maxWidth="lg"
      >
        <form onSubmit={handlePost} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Laboratory Safety Protocols & Mid-Term Date Adjustment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) =>
                  setTargetAudience(e.target.value as 'All' | 'Students' | 'Parents' | 'Teachers')
                }
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="All">All Portal Users</option>
                <option value="Students">Students Only</option>
                <option value="Parents">Parents Only</option>
                <option value="Teachers">Faculty & Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Priority Tag
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as 'High' | 'Normal' | 'Low')
                }
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="High">High Priority</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low / Optional Info</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Announcement Message Body *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Write detailed instructions, venue changes, or academic notices..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Pin this announcement to top of dashboard feed</span>
          </label>

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
              Broadcast Notice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
