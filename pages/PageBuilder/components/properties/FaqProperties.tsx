import React from 'react';
import { nanoid } from 'nanoid';
import { Plus } from 'lucide-react';
import { ComponentPropsMap } from '../../types.ts';
import { EditorProps } from '../PropertiesPanel.tsx';
import { Input } from '../ui/Input.tsx';
import { Textarea } from '../ui/Textarea.tsx';

export const FaqProperties: React.FC<EditorProps<ComponentPropsMap['FAQ']>> = ({ props, update, markUnsaved }) => {
    const handleItemChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newItems = [...props.items];
        newItems[index] = { ...newItems[index], [field]: value };
        update({ items: newItems });
    };
    const handleAddItem = () => {
        update({ items: [...props.items, {id: nanoid(), question: 'New Question', answer: 'New Answer'}] });
        markUnsaved();
    };
    const handleDeleteItem = (index: number) => {
        update({ items: props.items.filter((_, i) => i !== index) });
        markUnsaved();
    };
    return (
        <div>
            <h3 className="text-sm font-semibold mb-2">FAQ Items</h3>
            {props.items.map((item, index) => (
                <div key={item.id} className="p-2 border rounded mb-2 bg-item-bg">
                    <Input placeholder="Question" className="mb-1" value={item.question} onChange={e => handleItemChange(index, 'question', e.target.value)} />
                    <Textarea placeholder="Answer" value={item.answer} onChange={e => handleItemChange(index, 'answer', e.target.value)} />
                    <button onClick={() => handleDeleteItem(index)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                </div>
            ))}
            <button onClick={handleAddItem} className="text-sm text-blue-600 hover:underline flex items-center gap-1"><Plus size={14} /> Add FAQ</button>
        </div>
    );
};
