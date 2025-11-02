import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { PropertyField } from '../ui/PropertyField.tsx';
// FIX: Corrected import path.
import { Select } from '../ui/Select.tsx';
import { Textarea } from '../ui/Textarea.tsx';
import { AlignmentControl } from '../ui/AlignmentControl.tsx';
import { Input } from '../ui/Input.tsx';
import { ColorInput } from '../ui/ColorInput.tsx';

export const HeadlineProperties: React.FC<EditorProps<ComponentPropsMap['Headline']>> = ({ props, update }) => {
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value;
    const newStyle = { ...props.style };

    if (newSize && !isNaN(parseInt(newSize))) {
      newStyle.fontSize = `${newSize}px`;
    } else {
      delete newStyle.fontSize;
    }
    update({ style: newStyle });
  };
  
  return (
    <>
      <PropertyField label="Text">
        <Textarea value={props.text} onChange={e => update({ text: e.target.value })} />
      </PropertyField>
      <PropertyField label="Level">
        <Select value={props.level} onChange={e => update({ level: e.target.value as 'h1' | 'h2' | 'h3' })}>
          <option value="h1">Heading 1 (H1)</option>
          <option value="h2">Heading 2 (H2)</option>
          <option value="h3">Heading 3 (H3)</option>
        </Select>
      </PropertyField>
      <PropertyField label="Font Size (px)">
        <Input
          type="number"
          value={parseInt(String(props.style?.fontSize || '')) || ''}
          onChange={handleSizeChange}
          placeholder="Auto"
        />
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
};