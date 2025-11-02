// components/CanvasElement.tsx
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { X as XIcon, GripVertical } from 'lucide-react';
import { CanvasComponent } from '../types.ts';
import { InlineToolbar } from './InlineToolbar.tsx';
import { useBuilder } from '../context/BuilderContext.tsx';

// --- Component Renderer Imports ---
import { HeadlineRenderer } from './renderers/HeadlineRenderer.tsx';
import { TextRenderer } from './renderers/TextRenderer.tsx';
import { ButtonRenderer } from './renderers/ButtonRenderer.tsx';
import { ImageRenderer } from './renderers/ImageRenderer.tsx';
import { DividerRenderer } from './renderers/DividerRenderer.tsx';
import { SectionRenderer } from './renderers/SectionRenderer.tsx';
import { Columns2Renderer } from './renderers/Columns2Renderer.tsx';
import { ListRenderer } from './renderers/ListRenderer.tsx';
import { VideoRenderer } from './renderers/VideoRenderer.tsx';
import { TestimonialRenderer } from './renderers/TestimonialRenderer.tsx';
import { FaqRenderer } from './renderers/FaqRenderer.tsx';
import { PricingRenderer } from './renderers/PricingRenderer.tsx';
import { CountdownRenderer } from './renderers/CountdownRenderer.tsx';

// --- Component Renderer Map ---
const ComponentRenderers = {
  Headline: HeadlineRenderer, Text: TextRenderer, Button: ButtonRenderer, Image: ImageRenderer,
  Divider: DividerRenderer, Section: SectionRenderer, Columns2: Columns2Renderer, List: ListRenderer,
  Video: VideoRenderer, Testimonial: TestimonialRenderer, FAQ: FaqRenderer, Pricing: PricingRenderer,
  Countdown: CountdownRenderer,
};

// --- Main CanvasElement Component ---
interface CanvasElementProps {
  component: CanvasComponent;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({ component }) => {
  const { selectedId, selectComponent, deleteComponent, updateComponent } = useBuilder();
  const isSelected = component.id === selectedId;
  
  const elementRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'canvas-element',
    item: { id: component.id, type: 'canvas-element' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  drag(dragHandleRef);
  dragPreview(previewRef);

  const handleSelect = (e: React.MouseEvent) => { 
    e.stopPropagation(); 
    selectComponent(component.id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteComponent(component.id);
  }

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerHTML;
    if ((component.type === 'Text' || component.type === 'Headline') && newText !== component.props.text) {
        updateComponent(component.id, { text: newText });
    }
    setIsEditing(false);
  };
  
  const handleFocus = () => setIsEditing(true);
  const isTextEditable = component.type === 'Text' || component.type === 'Headline';

  const renderComponent = () => {
    const Renderer = ComponentRenderers[component.type as keyof typeof ComponentRenderers];
    if (!Renderer) {
      return <div>Unknown component type: {component.type}</div>;
    }
    const rendererProps: any = { component, isSelected };
    if (isTextEditable) {
      rendererProps.onBlur = handleBlur;
      rendererProps.onFocus = handleFocus;
    }
    return <Renderer {...rendererProps} />;
  };

  const selectionClass = isSelected ? 'outline-2 outline-blue-500 outline-dashed' : 'outline-transparent hover:outline-1 hover:outline-blue-300/50 outline-dashed';
  const hasFrame = component.type === 'Section' || component.type === 'Columns2' || component.type === 'Video';
  const draggingClass = isDragging ? 'opacity-30' : '';

  return (
    <div ref={previewRef} className={`${draggingClass}`}>
        <div ref={elementRef} onClick={handleSelect} className={`relative group ${hasFrame ? 'p-2' : 'p-1'} ${selectionClass}`}>
        {renderComponent()}
        {isSelected && (
            <>
                <div 
                    ref={dragHandleRef}
                    className="absolute top-0 left-0 -translate-y-full bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-t-md z-10 select-none flex items-center gap-1 cursor-grab"
                    title={`Drag to move ${component.type}`}
                >
                    <GripVertical size={12} />
                    {component.type}
                </div>
                {/* Action Toolbar */}
                <div 
                className="absolute top-[-12px] right-[-12px] z-10 flex items-center bg-white rounded-full shadow-lg p-0.5 space-x-0.5"
                aria-label="Component Actions"
                >
                    <button
                        onClick={handleDelete}
                        className="p-1.5 text-red-500 hover:bg-red-100 rounded-full"
                        aria-label={`Delete ${component.type} component`}
                        title="Delete"
                    >
                        <XIcon size={14} strokeWidth={2.5} />
                    </button>
                </div>
                
                {isEditing && isTextEditable && elementRef.current && (
                    <InlineToolbar element={elementRef.current} />
                )}
            </>
        )}
        </div>
    </div>
  );
};