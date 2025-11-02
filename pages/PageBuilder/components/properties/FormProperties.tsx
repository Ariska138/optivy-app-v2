import React from 'react';
import { Info } from 'lucide-react';
import { ComponentPropsMap } from '../../types';
import { EditorProps } from '../PropertiesPanel';
import { PropertyField } from '../ui/PropertyField';
import { Input } from '../ui/Input';
import { ColorInput } from '../ui/ColorInput';

export const FormProperties: React.FC<EditorProps<ComponentPropsMap['Form']>> = ({ props, update }) => {

  return (
    <>
      <div className="p-3 mb-4 bg-violet-50 border border-violet-200 text-violet-800 rounded-lg text-sm flex items-start gap-3">
          <Info size={18} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Checkout Form</p>
            <p>This component displays the form configured during product creation.</p>
          </div>
      </div>
      <PropertyField label="Button Text">
        <Input type="text" value={props.buttonText} onChange={e => update({ buttonText: e.target.value })} />
      </PropertyField>
      <PropertyField label="Button Color">
        <ColorInput
          value={props.buttonColor}
          onChange={(color) => update({ buttonColor: color })}
        />
      </PropertyField>
    </>
  );
};
