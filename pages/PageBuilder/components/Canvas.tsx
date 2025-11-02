// components/Canvas.tsx
import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { LayoutDashboard } from 'lucide-react';
import { CanvasComponent as CanvasComponentType, ComponentType } from '../types.ts';
import { CanvasElement } from './CanvasElement.tsx';
import { useBuilder } from '../context/BuilderContext.tsx';
import { findComponentInTree } from '../utils/component-utils.ts';
import { ReorderTarget } from '../context/BuilderContext.tsx';

interface DropItem {
  id?: string;
  type: ComponentType | 'canvas-element';
}

// Sub-component for handling drops between elements
const DropZone: React.FC<ReorderTarget & { isLast?: boolean }> = ({ parentId, columnIndex, dropIndex, isLast = false }) => {
  const { addComponent, reorderComponent } = useBuilder();
  const dropRef = React.useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['component', 'canvas-element'],
    drop: (item: DropItem, monitor: DropTargetMonitor) => {
      if (monitor.didDrop()) return;
      
      const target: ReorderTarget = { parentId, columnIndex, dropIndex };

      if (item.type === 'canvas-element' && item.id) {
        reorderComponent(item.id, target);
      } else {
        addComponent(item.type as ComponentType, parentId, columnIndex, dropIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }));

  drop(dropRef);
  
  const lastClass = isLast ? 'flex-grow min-h-8' : '';

  return (
    <div
      ref={dropRef}
      className={`relative transition-all duration-200 ease-in-out ${
        isOver && canDrop ? 'h-16 py-2' : 'h-4' // Increased height for the new indicator
      } ${lastClass}`}
    >
      {isOver && canDrop && (
        <div className="absolute inset-0 p-1">
            <div className="w-full h-full border-2 border-dashed border-blue-400 bg-blue-50/80 rounded-lg flex items-center justify-center">
              <span className="text-xs font-semibold text-blue-600">Drop here</span>
            </div>
        </div>
      )}
    </div>
  );
};


interface CanvasProps {
  parentId?: string | null;
  columnIndex?: number;
}

export const Canvas: React.FC<CanvasProps> = ({ parentId = null, columnIndex }) => {
  const { components, addComponent, reorderComponent } = useBuilder();

  const getRenderedComponents = (): CanvasComponentType[] => {
    if (parentId === null) return components;
    const parentComponent = findComponentInTree(components, parentId);
    if (!parentComponent) return [];
    if (parentComponent.type === 'Section') return parentComponent.props.children;
    if (parentComponent.type === 'Columns2') {
      const targetColumn = parentComponent.props.children[columnIndex ?? 0];
      return Array.isArray(targetColumn) ? targetColumn : [];
    }
    return [];
  };
  const renderedComponents = getRenderedComponents();
  
  const dropEmptyRef = React.useRef<HTMLDivElement>(null);
  const [{ isOverEmpty }, dropEmpty] = useDrop(() => ({
    accept: ['component', 'canvas-element'],
    drop: (item: DropItem, monitor: DropTargetMonitor) => {
        if (monitor.didDrop()) return;
        const target: ReorderTarget = { parentId, columnIndex, dropIndex: 0 };
         if (item.type === 'canvas-element' && item.id) {
            reorderComponent(item.id, target);
        } else {
            addComponent(item.type as ComponentType, parentId, columnIndex, 0);
        }
    },
    collect: monitor => ({
        isOverEmpty: monitor.isOver({ shallow: true }) && monitor.canDrop()
    })
  }));

  dropEmpty(dropEmptyRef);


  if (renderedComponents.length === 0) {
    return (
      <div 
        ref={dropEmptyRef}
        className={`w-full min-h-[120px] relative transition-all rounded-md flex items-center justify-center p-4 border-2 border-dashed ${isOverEmpty ? 'border-blue-500 bg-blue-50' : 'border-border-color'}`}
      >
        <div className="text-center text-text-tertiary pointer-events-none">
          <LayoutDashboard className="w-12 h-12 mb-2 text-border-color mx-auto" />
          <h3 className="text-sm font-semibold text-text-secondary">Drop Zone</h3>
          <p className="text-xs">Drag components here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100px] relative flex flex-col">
      <DropZone parentId={parentId} columnIndex={columnIndex} dropIndex={0} />
      {renderedComponents.map((comp, index) => (
        <React.Fragment key={comp.id}>
          <CanvasElement component={comp} />
          <DropZone 
            parentId={parentId} 
            columnIndex={columnIndex} 
            dropIndex={index + 1} 
            isLast={index === renderedComponents.length - 1}
          />
        </React.Fragment>
      ))}
    </div>
  );
};