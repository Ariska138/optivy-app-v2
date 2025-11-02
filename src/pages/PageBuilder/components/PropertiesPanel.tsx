import React from 'react';
import { X, Wrench } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import { AnyComponentProps, ComponentType } from '../types';

// Property Editor Imports
import { ButtonProperties } from './properties/ButtonProperties';
import { TextProperties } from './properties/TextProperties';
import { HeadlineProperties } from './properties/HeadlineProperties';
import { ImageProperties } from './properties/ImageProperties';
import { ListProperties } from './properties/ListProperties';
import { FaqProperties } from './properties/FaqProperties';
import { VideoProperties } from './properties/VideoProperties';
import { CountdownProperties } from './properties/CountdownProperties';
import { SectionProperties } from './properties/SectionProperties';
import { PricingProperties } from './properties/PricingProperties';
import { FormProperties } from './properties/FormProperties';

// Defines the props passed to each specific property editor component
export interface EditorProps<T extends AnyComponentProps> {
  props: T;
  update: (newProps: Partial<T>) => void;
  markUnsaved: () => void;
}

// Map component types to their corresponding property editor components
const PropertyEditors: { [key in ComponentType]?: React.FC<EditorProps<any>> } = {
  Button: ButtonProperties,
  Text: TextProperties,
  Headline: HeadlineProperties,
  Image: ImageProperties,
  List: ListProperties,
  FAQ: FaqProperties,
  Video: VideoProperties,
  Countdown: CountdownProperties,
  Section: SectionProperties,
  Pricing: PricingProperties,
  Form: FormProperties,
};

interface PropertiesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ isOpen, onClose }) => {
  const { selectedComponent, updateComponent, markUnsaved } = useBuilder();

  const handleUpdate = (newProps: Partial<AnyComponentProps>) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, newProps);
    }
  };

  const Editor = selectedComponent ? PropertyEditors[selectedComponent.type] : null;

  const panelContent = (
    <>
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-lg font-semibold text-gray-600">Properties</h2>
        <button onClick={onClose} className="md:hidden p-1 text-gray-400 hover:text-gray-800">
          <X size={20} />
        </button>
      </div>

      {selectedComponent ? (
        <div key={selectedComponent.id}>
          <p className="text-sm font-medium mb-3 text-gray-800">
            Editing: <span className="font-bold">{selectedComponent.type}</span>
          </p>
          {Editor ? (
            <Editor props={selectedComponent.props} update={handleUpdate} markUnsaved={markUnsaved} />
          ) : (
            <p className="text-sm text-gray-400">No specific properties to edit for this component.</p>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full pt-16">
          <Wrench className="w-12 h-12 mb-2 text-gray-300" />
          <h3 className="text-sm font-semibold text-gray-600">No Component Selected</h3>
          <p className="text-xs">Click on a component in the canvas to see its properties.</p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile panel overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      <aside
        className={`fixed bottom-0 right-0 w-full h-[70vh] bg-white p-4 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out md:relative md:w-80 md:h-auto md:border-l md:border-gray-200 md:transform-none md:transition-none
        ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}
      >
        {panelContent}
      </aside>
    </>
  );
};
