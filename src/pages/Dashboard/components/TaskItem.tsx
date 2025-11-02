import React from 'react';
import type { Task } from '../../../types';

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center">
      <div className={`p-3 rounded-full mr-4 ${task.iconBgColor}`}>
        {task.icon}
      </div>
      <div>
        <p className="font-semibold">{task.title}</p>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

