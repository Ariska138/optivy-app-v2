import React from 'react';
import { Card } from './Card';
import { TaskItem } from './TaskItem';
import { TeamMemberItem } from './TeamMemberItem';
import { dashboardTasks, dashboardTeamMembers } from '../../../constants/data';

export const RightSidebar: React.FC = () => (
    <div className="col-span-12 lg:col-span-4 space-y-6">
        <Card title="My Profile">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img src="https://i.pravatar.cc/150?u=zaenal" alt="Profile" className="w-24 h-24 rounded-full border-4 border-orange-400" />
                </div>
                <p className="font-bold mt-3">Zaenal Suep</p>
                <p className="text-sm text-gray-500">zaenalsuep@gmail.com</p>
                 <p className="text-sm font-semibold text-gray-600 mt-4">70% You're Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-orange-400 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
            </div>
        </Card>
        <Card title="Today" showViewAll>
            <div>
                {dashboardTasks.map(task => <TaskItem key={task.title} task={task} />)}
            </div>
        </Card>
        <Card title="Team" showViewAll>
             <div>
                {dashboardTeamMembers.map(member => <TeamMemberItem key={member.name} member={member} />)}
            </div>
        </Card>
    </div>
);
