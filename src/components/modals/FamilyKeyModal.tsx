import React, { useState } from 'react';
import { FamilyMember } from '../../types/callshield';

interface FamilyKeyModalProps {
  familyMembers: FamilyMember[];
  onAddFamilyMember: (member: FamilyMember) => void;
  onClose: () => void;
}

export const FamilyKeyModal: React.FC<FamilyKeyModalProps> = ({
  familyMembers,
  onAddFamilyMember,
  onClose,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('Son');
  const [newPhone, setNewPhone] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    onAddFamilyMember({
      id: `fam-${Date.now()}`,
      name: newName.trim(),
      relation: newRelation,
      phone: newPhone.trim(),
      avatarColor: 'bg-[#0058bc] text-white',
      isFamilyKeyVerified: true,
      notes: 'Added via Family Key Portal',
    });

    setNewName('');
    setNewPhone('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in text-[#1c1b1b]">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#f0edec] max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#f0edec] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-2.5">
            <span
              className="material-symbols-outlined text-[#006e28] text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <div>
              <h3 className="font-bold text-[18px] leading-tight">Family Key Safe List</h3>
              <p className="text-[13px] text-[#414755]">
                These verified callers always ring through instantly
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe7e7] hover:bg-[#e5e2e1] flex items-center justify-center text-[#414755] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Member list */}
        <div className="p-5 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#414755] uppercase tracking-wider">
              Protected Whitelist ({familyMembers.length})
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-[13px] font-semibold text-[#0058bc] hover:text-[#004ca4] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showAddForm ? 'close' : 'person_add'}
              </span>
              {showAddForm ? 'Cancel' : 'Add Contact'}
            </button>
          </div>

          {/* Add form */}
          {showAddForm && (
            <form
              onSubmit={handleAdd}
              className="p-3.5 bg-[#f6f3f2] rounded-xl space-y-3 border border-[#e5e2e1]"
            >
              <div>
                <label className="block text-[12px] font-bold text-[#414755] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. David Miller"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-lg border border-[#e5e2e1] text-[14px]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#414755] mb-1">
                    Relationship
                  </label>
                  <select
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value)}
                    className="w-full h-10 px-2 bg-white rounded-lg border border-[#e5e2e1] text-[14px]"
                  >
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Grandchild">Grandchild</option>
                    <option value="Doctor / Nurse">Doctor / Nurse</option>
                    <option value="Neighbor">Neighbor</option>
                    <option value="Caregiver">Caregiver</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#414755] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full h-10 px-3 bg-white rounded-lg border border-[#e5e2e1] text-[14px]"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-10 rounded-lg bg-[#006e28] text-white text-[14px] font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#005a20]"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Issue Family Key & Save
              </button>
            </form>
          )}

          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="p-3 bg-white rounded-xl border border-[#f0edec] flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] ${member.avatarColor}`}
                >
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[15px] text-[#1c1b1b] flex items-center gap-1.5">
                    {member.name}
                    <span
                      className="material-symbols-outlined text-[#006e28] text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      title="Family Key Active"
                    >
                      check_circle
                    </span>
                  </div>
                  <div className="text-[13px] text-[#414755]">{member.relation}</div>
                  <div className="text-[12px] text-[#717786] tabular-nums">{member.phone}</div>
                </div>
              </div>
              <span className="text-[12px] text-[#006e28] font-bold bg-[#6ffb85]/30 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
          ))}

          {/* Senior protection info box */}
          <div className="p-3.5 bg-[#f6f3f2] rounded-xl text-[13px] text-[#414755] flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#0058bc] text-[20px] shrink-0 mt-0.5">
              info
            </span>
            <p className="leading-relaxed">
              When a verified family contact calls, the call rings immediately with priority audio and displays their familiar name so your loved one never feels confused.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fcf9f8] border-t border-[#f0edec] flex justify-end">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-[#0058bc] hover:bg-[#004ca4] text-white font-semibold text-[15px] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
