import React, { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ComponentSidebar } from './components/ComponentSidebar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import {
  Save,
  FileDown,
  FileUp,
  CircleDotDashed,
  WebhookIcon,
} from 'lucide-react';
import { BuilderProvider, useBuilder } from './context/BuilderContext';
import { MobileBottomNav } from './components/MobileBottomNav';
import type { PageType } from '@/types';
import { useNavigate } from 'react-router-dom';


function AppContent() {
  const navigate = useNavigate();
  const {
    components,
    selectedId,
    isSaved,
    handleSave,
    setComponents,
    markUnsaved,
    deselectAll,
  } = useBuilder();
  const [activeMobilePanel, setActiveMobilePanel] = useState<
    'none' | 'components' | 'properties'
  >('none');
  const importInputRef = useRef<HTMLInputElement>(null);

  // Effect to switch the mobile panel when a component is selected
  useEffect(() => {
    if (selectedId && window.innerWidth < 768) {
      setActiveMobilePanel('properties');
    }
  }, [selectedId]);

  // Closes the mobile panel if no component is selected
  useEffect(() => {
    if (!selectedId) {
      if (activeMobilePanel === 'properties') {
        setActiveMobilePanel('none');
      }
    }
  }, [selectedId, activeMobilePanel]);

  const handleExport = () => {
    const jsonString = JSON.stringify(components, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-layout.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedComponents = JSON.parse(e.target?.result as string);
          // TODO: Add better schema validation here
          setComponents(importedComponents);
          markUnsaved();
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleToggleMobilePanel = (panel: 'components' | 'properties') => {
    setActiveMobilePanel((prev) => (prev === panel ? 'none' : panel));
  };

  return (
    <div className="flex flex-col h-screen bg-violet-50 font-sans text-gray-800">
      <header className="flex-shrink-0 bg-white backdrop-blur-sm border-b border-gray-200 p-2 flex justify-between items-center z-20 h-16">
        <div className="flex items-center gap-2 text-xl font-bold text-gray-800 pl-2">
          <CircleDotDashed className="text-violet-600" />
          <span>Builder</span>
        </div>
        <div className="flex items-center gap-3 pr-2">
          <input
            type="file"
            ref={importInputRef}
            onChange={handleImport}
            className="hidden"
            accept="application/json"
          />
          <button
            onClick={() => importInputRef.current?.click()}
            className="text-sm font-medium flex items-center gap-2 p-2 rounded-lg hover:bg-violet-100 text-gray-600"
            title="Import JSON"
          >
            <FileUp size={18} />
            <span className="hidden md:inline">Import</span>
          </button>
          <button
            onClick={handleExport}
            className="text-sm font-medium flex items-center gap-2 p-2 rounded-lg hover:bg-violet-100 text-gray-600"
            title="Export JSON"
          >
            <FileDown size={18} />
            <span className="hidden md:inline">Export</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
              isSaved
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            <Save size={16} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={() => navigate('/products/publish')}
            disabled={!isSaved}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
              isSaved
                ? 'bg-violet-600 text-white hover:bg-violet-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <WebhookIcon size={16} />
            {isSaved ? 'Finish' : 'Finish'}
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <ComponentSidebar
          isOpen={activeMobilePanel === 'components'}
          onClose={() => setActiveMobilePanel('none')}
        />
        <main
          className="flex-1 overflow-auto p-4 pb-20 md:pb-4"
          onClick={deselectAll}
        >
          <div className="max-w-lg mx-auto bg-white p-2 rounded-lg shadow-md min-h-full">
            <Canvas />
          </div>
        </main>
        <PropertiesPanel
          isOpen={activeMobilePanel === 'properties'}
          onClose={() => setActiveMobilePanel('none')}
        />
      </div>
      <MobileBottomNav
        activePanel={activeMobilePanel}
        onAddComponentClick={() => handleToggleMobilePanel('components')}
        onPropertiesClick={() => handleToggleMobilePanel('properties')}
        propertiesEnabled={!!selectedId}
      />
    </div>
  );
}

/**
 * The root component of the application.
 * It wraps the entire application with DndProvider for drag-and-drop functionality
 * and BuilderProvider for centralized state management.
 */

const PageBuilderPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BuilderProvider>
        <AppContent />
      </BuilderProvider>
    </DndProvider>
  );
};

export default PageBuilderPage;

