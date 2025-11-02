import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { PropertyField } from '../ui/PropertyField.tsx';
import { Input } from '../ui/Input.tsx';
import { ColorInput } from '../ui/ColorInput.tsx';

export const ButtonProperties: React.FC<EditorProps<ComponentPropsMap['Button']>> = ({ props, update }) => {

  const handleStyleChange = (property: keyof React.CSSProperties, value: string | number) => {
    update({ style: { ...props.style, [property]: value } });
  };

  return (
    <>
      <PropertyField label="Button Text">
        <Input type="text" value={props.text} onChange={e => update({ text: e.target.value })} />
      </PropertyField>
      <PropertyField label="Background Color">
        <ColorInput
          value={props.style?.backgroundColor as string | undefined}
          onChange={(color) => handleStyleChange('backgroundColor', color)}
        />
      </PropertyField>
      <PropertyField label="Text Color">
        <ColorInput
          value={props.style?.color as string | undefined}
          onChange={(color) => handleStyleChange('color', color)}
        />
      </PropertyField>
    </>
  );
};
