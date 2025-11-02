import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { PropertyField } from '../ui/PropertyField.tsx';
import { ColorInput } from '../ui/ColorInput.tsx';

export const SectionProperties: React.FC<EditorProps<ComponentPropsMap['Section']>> = ({ props, update }) => {
    
    const handleStyleChange = (property: keyof React.CSSProperties, value: string | number) => {
        update({ style: { ...props.style, [property]: value } });
    };

    return (
        <>
            <PropertyField label="Background Color">
                <ColorInput 
                    value={props.style?.backgroundColor as string | undefined}
                    onChange={(color) => handleStyleChange('backgroundColor', color)}
                />
            </PropertyField>
        </>
    );
};
