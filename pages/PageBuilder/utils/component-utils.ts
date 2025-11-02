// utils/component-utils.ts
import { nanoid } from 'nanoid';
import { CanvasComponent, ComponentType, AnyComponentProps } from '../types.ts';
import { ReorderTarget } from '../context/BuilderContext.tsx';
import { getDefaultProps } from './defaults.ts';

/**
 * NOTE ON IMMUTABILITY:
 * All functions in this file are designed to be "pure" and "immutable".
 * They do not mutate the state passed to them. Instead, they always return a NEW array or object.
 */

const isContainer = (comp: CanvasComponent): comp is (CanvasComponent & { type: 'Section' | 'Columns2' }) => {
    return comp.type === 'Section' || comp.type === 'Columns2';
};

const mapComponentChildren = (
  component: CanvasComponent,
  callback: (nodes: CanvasComponent[]) => CanvasComponent[]
): CanvasComponent => {
  if (!isContainer(component)) return component;

  if (component.type === 'Section') {
    return { ...component, props: { ...component.props, children: callback(component.props.children) } };
  }
  
  return { ...component, props: { ...component.props, children: [ callback(component.props.children[0]), callback(component.props.children[1]) ] } };
};

export const findComponentInTree = (comps: CanvasComponent[], id: string | null): CanvasComponent | null => {
  if (!id) return null;
  for (const comp of comps) {
    if (comp.id === id) return comp;
    if (isContainer(comp)) {
      const children: CanvasComponent[] = comp.type === 'Section' ? comp.props.children : comp.props.children.flat();
      const found = findComponentInTree(children, id);
      if (found) return found;
    }
  }
  return null;
};

export const addComponentToTree = (
  comps: CanvasComponent[], type: ComponentType, parentId?: string | null, columnIndex?: number, dropIndex?: number | null
): CanvasComponent[] => {
  const newComponent = { id: nanoid(), type, props: getDefaultProps(type) } as CanvasComponent;
  
  if (!parentId) {
    const insertionIndex = dropIndex ?? comps.length;
    return [ ...comps.slice(0, insertionIndex), newComponent, ...comps.slice(insertionIndex) ];
  }

  return comps.map(comp => {
    if (comp.id === parentId) {
      if (comp.type === 'Section') {
        const insertionIndex = dropIndex ?? comp.props.children.length;
        const newChildren = [ ...comp.props.children.slice(0, insertionIndex), newComponent, ...comp.props.children.slice(insertionIndex) ];
        return { ...comp, props: { ...comp.props, children: newChildren } };
      } else if (comp.type === 'Columns2') {
        const newChildren = [...comp.props.children] as [CanvasComponent[], CanvasComponent[]];
        const targetColumnIndex = columnIndex ?? (newChildren[0].length <= newChildren[1].length ? 0 : 1);
        const targetColumn = newChildren[targetColumnIndex];
        const finalInsertionIndex = dropIndex ?? targetColumn.length;
        
        newChildren[targetColumnIndex] = [ ...targetColumn.slice(0, finalInsertionIndex), newComponent, ...targetColumn.slice(finalInsertionIndex) ];
        return { ...comp, props: { ...comp.props, children: newChildren } };
      }
    } else if (isContainer(comp)) {
        return mapComponentChildren(comp, (children) => addComponentToTree(children, type, parentId, columnIndex, dropIndex));
    }
    return comp;
  });
};

export const updateComponentInTree = ( comps: CanvasComponent[], id: string, newProps: Partial<AnyComponentProps> ): CanvasComponent[] => {
  return comps.map(comp => {
    if (comp.id === id) {
      return { ...comp, props: { ...comp.props, ...newProps } } as CanvasComponent;
    }
    return mapComponentChildren(comp, (children) => updateComponentInTree(children, id, newProps));
  });
};

export const deleteComponentFromTree = ( comps: CanvasComponent[], id: string ): CanvasComponent[] => {
  return comps
    .filter(comp => comp.id !== id)
    .map(comp => mapComponentChildren(comp, (children) => deleteComponentFromTree(children, id)));
};

// --- Reordering Logic ---

const findAndRemoveComponent = (
  comps: CanvasComponent[], 
  id: string
): { component: CanvasComponent | null; newTree: CanvasComponent[] } => {
  const component = findComponentInTree(comps, id);
  if (!component) {
    return { component: null, newTree: comps };
  }
  const newTree = deleteComponentFromTree(comps, id);
  return { component, newTree };
};

const insertComponentObject = (
  comps: CanvasComponent[],
  componentToInsert: CanvasComponent,
  target: ReorderTarget
): CanvasComponent[] => {
  const { parentId, columnIndex, dropIndex } = target;

  if (!parentId) {
    return [
      ...comps.slice(0, dropIndex),
      componentToInsert,
      ...comps.slice(dropIndex),
    ];
  }

  return comps.map(comp => {
    if (comp.id === parentId) {
      if (comp.type === 'Section') {
        const newChildren = [
          ...comp.props.children.slice(0, dropIndex),
          componentToInsert,
          ...comp.props.children.slice(dropIndex),
        ];
        return { ...comp, props: { ...comp.props, children: newChildren } };
      } else if (comp.type === 'Columns2') {
        const newChildren = [...comp.props.children] as [CanvasComponent[], CanvasComponent[]];
        const targetColumnIndex = columnIndex ?? 0;
        const targetColumn = newChildren[targetColumnIndex];
        newChildren[targetColumnIndex] = [
          ...targetColumn.slice(0, dropIndex),
          componentToInsert,
          ...targetColumn.slice(dropIndex),
        ];
        return { ...comp, props: { ...comp.props, children: newChildren } };
      }
    }
    if (isContainer(comp)) {
      return mapComponentChildren(comp, (children) =>
        insertComponentObject(children, componentToInsert, target)
      );
    }
    return comp;
  });
};

export const reorderComponentInTree = (
  comps: CanvasComponent[],
  draggedId: string,
  target: ReorderTarget
): CanvasComponent[] => {
  const { component, newTree } = findAndRemoveComponent(comps, draggedId);
  if (!component) {
    return comps; // Component not found, do nothing
  }
  return insertComponentObject(newTree, component, target);
};
