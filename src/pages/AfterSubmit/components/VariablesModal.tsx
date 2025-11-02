
import React, { useState } from 'react';
import { VARIABLES } from '../constants';
import { CloseIcon, ClipboardIcon } from './icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onVariableSelect: (variable: string) => void;
}

const VariablesModal: React.FC<Props> = ({ isOpen, onClose, onVariableSelect }) => {
  const [copiedVar, setCopiedVar] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleItemClick = (variable: string) => {
    onVariableSelect(variable);
    navigator.clipboard.writeText(variable);
    setCopiedVar(variable);
    setTimeout(() => {
        onClose();
        setCopiedVar(null);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards' }}
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Sisipkan Variabel</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800">
            <CloseIcon />
          </button>
        </div>
        <div className="p-5 space-y-5 max-h-[65vh] overflow-y-auto">
          {Object.entries(VARIABLES).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {items.map((item) => (
                  <div
                    key={item.variable}
                    onClick={() => handleItemClick(item.variable)}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 cursor-pointer group"
                  >
                    <div>
                      <p className="font-mono text-sm text-[#8f60c9] font-semibold">{item.variable}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                    <div className="ml-2 h-5 w-5 flex items-center justify-center">
                      {copiedVar === item.variable ? (
                        <span className="text-sm font-semibold text-emerald-500">Disalin!</span>
                      ) : (
                        <ClipboardIcon />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-in {
            animation: scaleIn 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
        }
      `}</style>
    </div>
  );
};

export default VariablesModal;
