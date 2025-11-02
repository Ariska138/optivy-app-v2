import React from 'react';
import { nanoid } from 'nanoid';
import { Trash2, Plus } from 'lucide-react';
import { ComponentPropsMap } from '../../types';
import { EditorProps } from '../PropertiesPanel';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export const ListProperties: React.FC<EditorProps<ComponentPropsMap['List']>> = ({ props, update, markUnsaved }) => {
    const handleItemChange = (index: number, field: 'text' | 'icon', value: string) => {
        const newItems = [...props.items];
        newItems[index] = { ...newItems[index], [field]: value };
        update({ items: newItems });
    };
    const handleAddItem = () => {
        update({ items: [...props.items, { id: nanoid(), text: 'New Item', icon: 'check-circle' }] });
        markUnsaved();
    };
    const handleDeleteItem = (index: number) => {
        update({ items: props.items.filter((_, i) => i !== index) });
        markUnsaved();
    };
    return (
        <div>
            <h3 className="text-sm font-semibold mb-2">List Items</h3>
            {props.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 mb-2">
                    <Select 
                      value={item.icon} 
                      onChange={e => handleItemChange(index, 'icon', e.target.value)}
                      className="w-24 flex-shrink-0"
                    >
                        <option value="check-circle">Green Check</option>
                        <option value="x-circle">Red Cross</option>
                        <option value="arrow-right">Arrow</option>
                        <option value="dot">Dot</option>
                        <option value="star">Star</option>
                    </Select>
                    <Input type="text" value={item.text} onChange={e => handleItemChange(index, 'text', e.target.value)} />
                    <button onClick={() => handleDeleteItem(index)} className="p-1 text-red-500 hover:text-red-700 flex-shrink-0" aria-label="Delete item"><Trash2 size={16} /></button>
                </div>
            ))}
            <button onClick={handleAddItem} className="text-sm text-violet-600 hover:underline flex items-center gap-1"><Plus size={14} /> Add Item</button>
        </div>
    );
};
