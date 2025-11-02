import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { PropertyField } from '../ui/PropertyField.tsx';
import { Input } from '../ui/Input.tsx';

export const ImageProperties: React.FC<EditorProps<ComponentPropsMap['Image']>> = ({ props, update }) => (
  <>
    <PropertyField label="Image URL">
      <Input type="text" value={props.src} onChange={e => update({ src: e.target.value })} />
    </PropertyField>
    <PropertyField label="Alt Text">
      <Input type="text" value={props.alt} onChange={e => update({ alt: e.target.value })} />
    </PropertyField>
  </>
);
