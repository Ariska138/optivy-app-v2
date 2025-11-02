import React from 'react';
// FIX: 'TeamRole' was imported as a type, but is used as a value. It's an enum, so it needs a value import.
import { type ManagedTeamMember, TeamRole } from '../../../types';

const RoleBadge: React.FC<{ role: TeamRole }> = ({ role }) => {
  const styles: Record<TeamRole, string> = {
    [TeamRole.Admin]: 'bg-red-100 text-red-800',
    [TeamRole.Sales]: 'bg-blue-100 text-blue-800',
    [TeamRole.Gudang]: 'bg-green-100 text-green-800',
    [TeamRole.Advertiser]: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${styles[role]}`}
    >
      {role}
    </span>
  );
};

const MemberItem: React.FC<{
  member: ManagedTeamMember;
  onDelete: (id: number) => void;
}> = ({ member, onDelete }) => (
  <div className="flex items-center justify-between p-4 transition-colors hover:bg-violet-50">
    <div className="flex items-center gap-4">
      <img
        src={member.avatarUrl}
        alt={member.name}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="font-semibold text-gray-900">{member.name}</p>
        <p className="text-sm text-gray-500">{member.email}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <RoleBadge role={member.role} />
      <button className="text-gray-400 hover:text-violet-600 p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={() => onDelete(member.id)}
        className="text-gray-400 hover:text-red-600 p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
);

interface TeamListProps {
  members: ManagedTeamMember[];
  onDelete: (id: number) => void;
}

export const TeamList: React.FC<TeamListProps> = ({ members, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg text-gray-800">
          Anggota Tim ({members.length})
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {members.map((member) => (
          <MemberItem key={member.id} member={member} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

