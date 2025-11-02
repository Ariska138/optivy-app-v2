import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Bold, Italic, Underline, Palette, Highlighter, Eraser } from 'lucide-react';

interface InlineToolbarProps {
  element: HTMLElement;
}

export const InlineToolbar: React.FC<InlineToolbarProps> = ({ element }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  const execCmd = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    element.focus();
  };

  const handleFormat = (e: React.MouseEvent, cmd: string, value?: string) => {
    e.preventDefault();
    execCmd(cmd, value);
  };

  useEffect(() => {
    const updatePosition = () => {
      if (!element || !toolbarRef.current) return;

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed || !element.contains(selection.anchorNode)) {
        setPosition({ top: -9999, left: -9999 });
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const toolbarEl = toolbarRef.current;
      const toolbarRect = toolbarEl.getBoundingClientRect();

      let top = rect.top - toolbarRect.height - 8;
      let left = rect.left + (rect.width / 2) - (toolbarRect.width / 2);

      if (top < 8) top = rect.bottom + 8;
      if (left < 8) left = 8;
      if (left + toolbarRect.width > window.innerWidth - 8) {
        left = window.innerWidth - toolbarRect.width - 8;
      }

      setPosition({ top: top + window.scrollY, left: left + window.scrollX });
    };
    
    document.addEventListener('selectionchange', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    updatePosition(); 

    return () => {
      document.removeEventListener('selectionchange', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [element]);
  
  const portalElement = document.getElementById('root');
  if (!portalElement) return null;

  return ReactDOM.createPortal(
    <div
      ref={toolbarRef}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      className="absolute bg-gray-800 text-white rounded-md p-1 flex items-center gap-1 z-50"
      onMouseDown={e => e.preventDefault()}
    >
      <button onClick={(e) => handleFormat(e, 'bold')} className="p-1.5 hover:bg-gray-700 rounded" title="Bold"><Bold size={16} /></button>
      <button onClick={(e) => handleFormat(e, 'italic')} className="p-1.5 hover:bg-gray-700 rounded" title="Italic"><Italic size={16} /></button>
      <button onClick={(e) => handleFormat(e, 'underline')} className="p-1.5 hover:bg-gray-700 rounded" title="Underline"><Underline size={16} /></button>
      
      <div className="w-px h-5 bg-gray-600 mx-1"></div>

      <div className="relative p-1.5 hover:bg-gray-700 rounded" title="Text Color">
        <Palette size={16} />
        <input 
            type="color" 
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => execCmd('foreColor', e.target.value)}
        />
      </div>
      <div className="relative p-1.5 hover:bg-gray-700 rounded" title="Highlight Color">
        <Highlighter size={16} />
        <input 
            type="color" 
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => execCmd('backColor', e.target.value)}
        />
      </div>

      <div className="w-px h-5 bg-gray-600 mx-1"></div>

      <button onClick={(e) => handleFormat(e, 'removeFormat')} className="p-1.5 hover:bg-gray-700 rounded" title="Remove Formatting"><Eraser size={16} /></button>

    </div>,
    portalElement
  );
};
