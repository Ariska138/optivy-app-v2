import React from 'react';
import { Card } from './Card';
import { TaskItem } from './TaskItem';
import { TeamMemberItem } from './TeamMemberItem';
import { dashboardTasks, dashboardTeamMembers } from '../../../constants/data';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '@/contexts/AuthContext';

export const RightSidebar = ({ state }: { state: AuthState }) => {
  const navigate = useNavigate();

  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <Card title="My Profile">
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* <img
              src="https://i.pravatar.cc/150?u=zaenal"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-orange-400"
            /> */}
          </div>
          <p className="font-bold mt-3">{state.user.name}</p>
          <p className="text-sm text-gray-500">{state.user.username}</p>
          <p className="text-sm font-semibold text-gray-600 mt-4">
            70% You're Progress
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-orange-400 h-2.5 rounded-full"
              style={{ width: '70%' }}
            ></div>
          </div>
          <button
            onClick={() => navigate('/edit-profile')}
            className="mt-6 w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-violet-700 transition duration-300 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
              />
            </svg>
            Edit Profile
          </button>
        </div>
      </Card>
      <Card title="Today" showViewAll>
        <div>
          {dashboardTasks.map((task) => (
            <TaskItem key={task.title} task={task} />
          ))}
        </div>
      </Card>
      <Card title="Team" showViewAll>
        <div>
          {dashboardTeamMembers.map((member) => (
            <TeamMemberItem key={member.name} member={member} />
          ))}
        </div>
      </Card>
    </div>
  );
};

