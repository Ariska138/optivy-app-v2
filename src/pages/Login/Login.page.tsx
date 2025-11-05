import React from 'react';
import BrandingPanel from './components/BrandingPanel';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          <BrandingPanel />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default App;