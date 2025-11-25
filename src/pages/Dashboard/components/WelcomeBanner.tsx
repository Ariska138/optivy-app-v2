import { AuthState } from '@/contexts/AuthContext';
import React from 'react';

export const WelcomeBanner: React.FC<{ state: AuthState }> = ({ state }) => (
  <div className="col-span-12 lg:col-span-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 flex items-center justify-between text-white shadow-lg">
    <div className="flex items-center">
      {/* <img
        src="https://i.pravatar.cc/150?u=man-ceo"
        alt="User"
        className="w-28 h-28 rounded-xl mr-6 border-4 border-white/20"
      /> */}
      <div>
        <h2 className="text-3xl font-bold">Hello, {state.user.name}</h2>
        <p className="mt-2 max-w-md text-white/90">
          You have an unfinished job. Among them are 2 design tasks, 3 mockup
          tasks and 2 layouts. Work for the week is very good, already in
          progress 70%.
        </p>
      </div>
    </div>
  </div>
);

