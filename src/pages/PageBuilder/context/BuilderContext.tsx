// context/BuilderContext.tsx
import React, { createContext, useContext } from 'react';
import { CanvasComponent, ComponentType, AnyComponentProps } from '../types.ts';
import { useBuilderState } from '../hooks/useBuilderState.ts';

export interface ReorderTarget {
  parentId: string | null;
  columnIndex?: number;
  dropIndex: number;
}

// 1. Define the Shape of the Context
interface BuilderContextType {
  components: CanvasComponent[];
  selectedId: string | null;
  selectedComponent: CanvasComponent | null;
  isSaved: boolean;
  addComponent: (type: ComponentType, parentId?: string | null, columnIndex?: number, dropIndex?: number | null) => void;
  updateComponent: (id: string, newProps: Partial<AnyComponentProps>) => void;
  deleteComponent: (id: string) => void;
  reorderComponent: (draggedId: string, target: ReorderTarget) => void;
  selectComponent: (id: string) => void;
  deselectAll: () => void;
  handleSave: () => void;
  markUnsaved: () => void;
  setComponents: (components: CanvasComponent[]) => void;
}

// 2. Create the Context with a default value
const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// 3. Create the Provider Component
export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const builderState = useBuilderState();

  return (
    <BuilderContext.Provider value={builderState}>
      {children}
    </BuilderContext.Provider>
  );
};

// 4. Create a Custom Hook to Use the Context
export const useBuilder = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
