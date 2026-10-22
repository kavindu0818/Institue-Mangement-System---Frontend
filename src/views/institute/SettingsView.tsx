import React, { useState } from 'react';
import { Settings, Globe, Bell, Building, Shield, Check, Save } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateSettings } from '../../store/instituteSlice';
import { setLanguage } from '../../store/authSlice';

export const SettingsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { instituteSettings } = useAppSelector((state) => state.institute);
  const { activeLanguage } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({ ...instituteSettings });
  const [savedNotice, setSavedNotice] = useState(false);

  const languages = [
    { code: 'en', name: 'English', region: 'Default' },
    { code: 'fr', name: 'French (Français)', region: 'Europe / Canada' },
    { code: 'es', name: 'Spanish (Español)', region: 'Latin America / Spain' },
    { code: 'de', name: 'German (Deutsch)', region: 'Central Europe' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateSettings(formData));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Institute Profile & System Configuration
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize institute credentials, localized language, timezone, and communication gateway
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <p className="text-xs sm:text-sm font-semibold text-emerald-900">
            Settings updated and applied across all portals successfully!
          </p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institute Info Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Institute Profile & Public Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institute Name
              </label>
              <input
                type="text"
                value={formData.instituteName}
                onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Motto / Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Helpdesk Phone
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Campus Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Language & Regional Localization */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Languages & Multi-lingual Localization
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => dispatch(setLanguage(lang.name))}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  activeLanguage.includes(lang.name)
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    {lang.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{lang.region}</p>
                </div>
                {activeLanguage.includes(lang.name) && (
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Automation Policy */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Notification Gateways & Dispatch Rules
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Automated SMS Alerts for Absences
                </span>
                <span className="text-[11px] text-slate-500">
                  Instantly dispatch SMS to parents when student marked absent in class
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.enableSmsNotifications}
                onChange={(e) =>
                  setFormData({ ...formData, enableSmsNotifications: e.target.checked })
                }
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Weekly Academic Digest Emails
                </span>
                <span className="text-[11px] text-slate-500">
                  Email compiled exam scores and attendance summary every Sunday evening
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.enableEmailDigests}
                onChange={(e) =>
                  setFormData({ ...formData, enableEmailDigests: e.target.checked })
                }
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
};
