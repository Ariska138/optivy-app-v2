import React from 'react';
import { nanoid } from 'nanoid';
import { Trash2, Plus } from 'lucide-react';
import { ComponentPropsMap } from '../../types';
import { EditorProps } from '../PropertiesPanel';
import { Input } from '../ui/Input';
import { PropertyField } from '../ui/PropertyField';

export const PricingProperties: React.FC<EditorProps<ComponentPropsMap['Pricing']>> = ({ props, update, markUnsaved }) => {
    
    const handleFeatureChange = (index: number, newText: string) => {
        const newFeatures = [...props.features];
        newFeatures[index] = { ...newFeatures[index], text: newText };
        update({ features: newFeatures });
    };

    const handleAddFeature = () => {
        const newFeatures = [...props.features, { id: nanoid(), text: 'New Feature' }];
        update({ features: newFeatures });
        markUnsaved();
    };

    const handleDeleteFeature = (index: number) => {
        const newFeatures = props.features.filter((_, i) => i !== index);
        update({ features: newFeatures });
        markUnsaved();
    };
    
    return (
        <>
            <PropertyField label="Plan Name">
                <Input value={props.planName} onChange={e => update({ planName: e.target.value })} />
            </PropertyField>
            <div className="grid grid-cols-2 gap-2">
                <PropertyField label="Price">
                    <Input value={props.price} onChange={e => update({ price: e.target.value })} />
                </PropertyField>
                <PropertyField label="Period">
                    <Input value={props.period} onChange={e => update({ period: e.target.value })} />
                </PropertyField>
            </div>
             <PropertyField label="Button Text">
                <Input value={props.buttonText} onChange={e => update({ buttonText: e.target.value })} />
            </PropertyField>

            <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 my-3">
                <label htmlFor="popular-toggle" className="text-sm font-medium text-gray-600">
                    Mark as Popular
                </label>
                <input
                    id="popular-toggle"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                    checked={props.popular}
                    onChange={e => update({ popular: e.target.checked })}
                />
            </div>
            
            <div className="border-t border-gray-200 my-4"></div>

            <div>
                <h3 className="text-sm font-semibold mb-2">Features</h3>
                {props.features.map((feature, index) => (
                    <div key={feature.id} className="flex items-center gap-2 mb-2">
                        <Input value={feature.text} onChange={e => handleFeatureChange(index, e.target.value)} />
                        <button onClick={() => handleDeleteFeature(index)} className="p-1 text-red-500 hover:text-red-700" aria-label="Delete feature"><Trash2 size={16} /></button>
                    </div>
                ))}
                <button onClick={handleAddFeature} className="text-sm text-violet-600 hover:underline flex items-center gap-1"><Plus size={14} /> Add Feature</button>
            </div>
        </>
    );
};
