import React from 'react';
import type { TeamMember } from '../../../types';

export const TeamMemberItem: React.FC<{ member: TeamMember }> = ({
  member,
}) => (
  <div className="flex items-center justify-between py-2.5">
    <div className="flex items-center">
      <img
        src={member.avatarUrl}
        alt={member.name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <p className="font-semibold">{member.name}</p>
        <p className="text-sm text-gray-500">{member.role}</p>
      </div>
    </div>
    <div
      className={`w-2.5 h-2.5 rounded-full ${
        member.status === 'online' ? 'bg-green-400' : 'bg-gray-300'
      }`}
    ></div>
  </div>
);

