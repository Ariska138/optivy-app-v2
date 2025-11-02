import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { PropertyField } from '../ui/PropertyField.tsx';
import { Textarea } from '../ui/Textarea.tsx';
import { AlignmentControl } from '../ui/AlignmentControl.tsx';
import { ColorInput } from '../ui/ColorInput.tsx';

export const TextProperties: React.FC<EditorProps<ComponentPropsMap['Text']>> = ({ props, update }) => (
  <>
    <PropertyField label="Text">
      <Textarea value={props.text} onChange={e => update({ text: e.target.value })} />
    </PropertyField>
    <PropertyField label="Text Color">
      <ColorInput 
        value={props.style?.color as string | undefined}
        onChange={(color) => update({ style: { ...props.style, color } })}
      />
    </PropertyField>
    <PropertyField label="Background Color">
      <ColorInput 
        value={props.style?.backgroundColor as string | undefined}
        onChange={(color) => update({ style: { ...props.style, backgroundColor: color } })}
      />
    </PropertyField>
    <PropertyField label="Alignment">
      <AlignmentControl 
        value={props.style?.textAlign as any} 
        onChange={value => update({ style: { ...props.style, textAlign: value } })} 
      />
    </PropertyField>
  </>
);