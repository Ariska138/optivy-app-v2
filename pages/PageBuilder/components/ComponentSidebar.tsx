import React from 'react';
import { 
    MousePointerClick, Type, Heading2, Image as ImageIcon, Minus, 
    Square, Columns, List as ListIcon, Video, MessageSquare,
    HelpCircle, BadgeDollarSign, Timer, X
} from 'lucide-react';
import { DraggableComponent } from './DraggableComponent.tsx';

interface ComponentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComponentSidebar: React.FC<ComponentSidebarProps> = ({ isOpen, onClose }) => {
  const sidebarContent = (
    <>
      <div className="flex justify-between items-center mb-4 border-b border-border-color pb-2">
        <h2 className="text-lg font-semibold text-text-secondary">Components</h2>
        <button onClick={onClose} className="md:hidden p-1 text-text-tertiary hover:text-text-primary">
          <X size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <DraggableComponent type="Section" name="Section" icon={<Square className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Columns2" name="2 Columns" icon={<Columns className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Headline" name="Headline" icon={<Heading2 className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Text" name="Paragraph" icon={<Type className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Button" name="Button" icon={<MousePointerClick className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Image" name="Image" icon={<ImageIcon className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="List" name="List" icon={<ListIcon className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Video" name="Video" icon={<Video className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Testimonial" name="Testimonial" icon={<MessageSquare className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="FAQ" name="FAQ" icon={<HelpCircle className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Pricing" name="Pricing" icon={<BadgeDollarSign className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Countdown" name="Countdown" icon={<Timer className="w-8 h-8 text-text-tertiary" />} />
        <DraggableComponent type="Divider" name="Divider" icon={<Minus className="w-8 h-8 text-text-tertiary" />} />
      </div>
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
        className={`fixed bottom-0 left-0 w-full h-[70vh] bg-sidebar-bg p-4 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out md:relative md:w-64 md:h-auto md:border-r md:border-border-color md:transform-none md:transition-none
        ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
