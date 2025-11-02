import React from 'react';
import type { Project } from '../../../types';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-violet-50/50 p-4 rounded-xl flex items-start gap-4">
    <div className={`p-3 rounded-lg ${project.iconBgColor}`}>
      {project.icon}
    </div>
    <div>
      <h4 className="font-bold">
        {project.title}{' '}
        <span className="font-normal text-gray-500">{project.category}</span>
      </h4>
      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
    </div>
  </div>
);

