import React, { useState } from 'react';
import { Send, MessageSquare, Edit2, Copy, Check, Smartphone, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateSmsTemplate } from '../../store/instituteSlice';
import { SmsTemplate } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const SmsTemplatesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { smsTemplates } = useAppSelector((state) => state.institute);

  const [selectedTemplate, setSelectedTemplate] = useState<SmsTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [broadcastSent, setBroadcastSent] = useState<string | null>(null);

  // Edit fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOpenEdit = (template: SmsTemplate) => {
    setSelectedTemplate(template);
    setTitle(template.title);
    setContent(template.content);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    dispatch(
      updateSmsTemplate({
        ...selectedTemplate,
        title,
        content,
      })
    );
    setIsModalOpen(false);
  };

  const handleBroadcastSim = (id: string) => {
    setBroadcastSent(id);
    setTimeout(() => setBroadcastSent(null), 3000);
  };

  const copyVariable = (varName: string) => {
    navigator.clipboard.writeText(varName);
    setCopiedId(varName);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            SMS & Automated Notification Templates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standardized message formats for fee reminders, attendance absence alerts, and exam publications
          </p>
        </div>
      </div>

      {broadcastSent && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-emerald-900">
                Broadcast Dispatched Successfully!
              </p>
              <p className="text-xs text-emerald-700">
                124 SMS deliveries queued and delivered to parent registered phone lines.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {smsTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="purple" size="sm">
                    {template.type}
                  </Badge>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">
                    {template.title}
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400">
                  Updated: {template.lastUpdated}
                </span>
              </div>

              {/* Message Bubble Simulator */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono relative">
                <Smartphone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                "{template.content}"
              </div>

              {/* Available Variables */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Variables:
                </span>
                {template.variables.map((variable) => (
                  <button
                    key={variable}
                    onClick={() => copyVariable(variable)}
                    className="text-[11px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-mono transition-colors flex items-center gap-1"
                    title="Click to copy variable"
                  >
                    {variable}
                    {copiedId === variable ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-2.5 h-2.5 text-indigo-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleOpenEdit(template)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Template
              </button>

              <button
                onClick={() => handleBroadcastSim(template.id)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Test Broadcast
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit SMS Notification Template"
        description="Insert placeholders enclosed in {curly_braces} to inject live student database values."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Template Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                SMS Content (Character Count: {content.length} / 160)
              </label>
              <span className="text-[11px] text-slate-400">
                {Math.ceil(content.length / 160) || 1} SMS segment
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wide">
              Supported Variables:
            </span>
            <p className="text-[11px] font-mono text-indigo-700">
              {'{student_name}'}, {'{parent_name}'}, {'{subject}'}, {'{date}'}, {'{amount}'}, {'{invoice_number}'}, {'{grade}'}
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
              Save Template Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
