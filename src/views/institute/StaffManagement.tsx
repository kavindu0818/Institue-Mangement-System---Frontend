import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Edit2,
  Mail,
  Phone,
  Shield,
  Search,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateStaffMember } from '../../store/instituteSlice';
import { StaffMember } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const StaffManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { staff } = useAppSelector((state) => state.institute);

  const [search, setSearch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState<StaffMember>({
    id: '',
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active',
    permissions: [],
  });

  const availablePermissions = [
    'Mark Attendance',
    'Create Exams',
    'Grade Students',
    'Upload Materials',
    'Student Admissions',
    'Fee Collection',
    'SMS Broadcasts',
    'System Configuration',
  ];

  const handleOpenEdit = (member: StaffMember) => {
    setSelectedStaff(member);
    setFormData(member);
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    const newMember: StaffMember = {
      id: `staff-${Date.now()}`,
      name: '',
      role: 'Lecturer',
      department: 'Physics',
      email: '',
      phone: '',
      status: 'Active',
      permissions: ['Mark Attendance', 'Upload Materials'],
    };
    setSelectedStaff(null);
    setFormData(newMember);
    setIsModalOpen(true);
  };

  const handleTogglePermission = (perm: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    dispatch(updateStaffMember(formData));
    setIsModalOpen(false);
  };

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Staff & Faculty Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage teaching faculty, coordinators, and access rights (Edit Staff Member modal)
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          Add Staff Member
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, role, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white text-slate-800 text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
        />
      </div>

      {/* Staff Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-400">{member.department}</p>
                </div>
                <Badge variant={member.status === 'Active' ? 'success' : 'neutral'} dot={true}>
                  {member.status}
                </Badge>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Assigned Permissions */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Permissions ({member.permissions.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {member.permissions.slice(0, 3).map((perm) => (
                    <span
                      key={perm}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 rounded-md"
                    >
                      {perm}
                    </span>
                  ))}
                  {member.permissions.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600">
                      +{member.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => handleOpenEdit(member)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Member Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Staff Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        description="Update profile information, department assignment, and security privileges."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="e.g. Dr. Catherine Hall"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="e.g. Senior Professor"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="e.g. Department of Physics"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })
                }
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive / On Leave</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="staff@apex-institute.edu"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              System Permissions & Role Capabilities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availablePermissions.map((perm) => {
                const checked = formData.permissions.includes(perm);
                return (
                  <label
                    key={perm}
                    onClick={() => handleTogglePermission(perm)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                      checked
                        ? 'border-indigo-500 bg-indigo-50/70 text-indigo-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{perm}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
              Save Member
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
