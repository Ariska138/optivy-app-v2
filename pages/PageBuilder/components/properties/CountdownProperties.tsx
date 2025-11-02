import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { PropertyField } from '../ui/PropertyField.tsx';
import { Input } from '../ui/Input.tsx';

export const CountdownProperties: React.FC<EditorProps<ComponentPropsMap['Countdown']>> = ({ props, update }) => (
    <PropertyField label="Target Date">
        <Input type="datetime-local" value={props.targetDate.substring(0, 16)} onChange={e => update({ targetDate: new Date(e.target.value).toISOString() })} />
    </PropertyField>
);
