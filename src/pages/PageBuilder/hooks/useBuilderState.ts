// hooks/useBuilderState.ts
import { useState, useCallback, useEffect } from 'react';
import { CanvasComponent, ComponentType, AnyComponentProps } from '../types.ts';
import { ReorderTarget } from '../context/BuilderContext.tsx';
import { addComponentToTree, updateComponentInTree, deleteComponentFromTree, findComponentInTree, reorderComponentInTree } from '../utils/component-utils.ts';

/**
 * Custom hook to manage the entire state of the page builder.
 */
export function useBuilderState() {
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    try {
      const savedComponents = localStorage.getItem('pageBuilderComponents');
      if (savedComponents) {
        setComponents(JSON.parse(savedComponents));
      }
    } catch (e) {
      console.error("Failed to parse components from local storage", e);
      setComponents([]);
    }
  }, []);

  const markUnsaved = useCallback(() => {
    if (isSaved) setIsSaved(false);
  }, [isSaved]);

  const handleSave = () => {
    localStorage.setItem('pageBuilderComponents', JSON.stringify(components));
    setIsSaved(true);
  };

  const addComponent = useCallback((type: ComponentType, parentId?: string | null, columnIndex?: number, dropIndex?: number | null) => {
    setComponents(prev => addComponentToTree(prev, type, parentId, columnIndex, dropIndex));
    markUnsaved();
  }, [markUnsaved]);

  const updateComponent = useCallback((id: string, newProps: Partial<AnyComponentProps>) => {
    setComponents(prev => updateComponentInTree(prev, id, newProps));
    markUnsaved();
  }, [markUnsaved]);

  const deleteComponent = useCallback((id: string) => {
    setComponents(prev => deleteComponentFromTree(prev, id));
    if (selectedId === id) {
      setSelectedId(null);
    }
    markUnsaved();
  }, [selectedId, markUnsaved]);

  const reorderComponent = useCallback((draggedId: string, target: ReorderTarget) => {
    setComponents(prev => reorderComponentInTree(prev, draggedId, target));
    markUnsaved();
  }, [markUnsaved]);

  const selectComponent = useCallback((id: string) => {
    setSelectedId(id);
  }, []);
  
  const deselectAll = useCallback(() => {
      setSelectedId(null);
  }, []);
  
  const selectedComponent = findComponentInTree(components, selectedId || null);

  return {
    components, selectedId, selectedComponent, isSaved,
    addComponent, updateComponent, deleteComponent, reorderComponent,
    selectComponent, deselectAll, handleSave, markUnsaved, setComponents,
  };
}
