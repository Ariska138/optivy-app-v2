import React from 'react';
import { ComponentPropsMap } from '../../types';

export const FormRenderer: React.FC<{ component: { props: ComponentPropsMap['Form']} }> = ({ component }) => {
  const { style, buttonText, buttonColor, fields } = component.props;

  return (
    <div style={style} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-center text-gray-800">Checkout Form</h3>
      <div className="space-y-3">
        {fields.map(field => (
          <div key={field.id}>
            <label className="text-sm font-medium text-slate-700">{field.label}{field.required ? '*' : ''}</label>
            <input 
              type="text" 
              className="mt-1 bg-slate-100 border border-slate-300 rounded-lg p-3 w-full cursor-not-allowed" 
              placeholder={`Masukkan ${field.label.toLowerCase()}`}
              disabled
            />
          </div>
        ))}
      </div>
      <button 
        className="w-full text-white font-bold py-3 rounded-lg transition-all mt-4 cursor-not-allowed" 
        style={{ backgroundColor: buttonColor }}
        disabled
      >
        {buttonText}
      </button>
    </div>
  );
};
