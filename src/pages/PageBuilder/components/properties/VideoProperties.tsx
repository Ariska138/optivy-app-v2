import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { PropertyField } from '../ui/PropertyField.tsx';
import { Input } from '../ui/Input.tsx';

export const VideoProperties: React.FC<EditorProps<ComponentPropsMap['Video']>> = ({ props, update }) => (
    <PropertyField label="YouTube URL">
        <Input type="text" value={props.url} onChange={e => update({ url: e.target.value })} />
    </PropertyField>
);
