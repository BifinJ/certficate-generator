// DisplayVariables.tsx
import React, { useState, useEffect } from 'react';
import { getVariables, removeVariable } from "@/app/api/Variables";
import VariableData from "@/interfaces/VariableData";
import AddTipTapComponent from '@/app/api/AddTiptap';

interface DisplayVariablesProps{
  onTipTapComponentChange: () => void;
}

export default function DisplayVariables() {
  const [variables, setVariables] = useState<VariableData[]>([]);

  useEffect(() => {
    const handleVariableChange = () => {
      setVariables((getVariables()));
    };
    window.addEventListener('variableChange', handleVariableChange);
    return () => {
        window.removeEventListener('variableChange', handleVariableChange);
    };
  }, []);

  const handleDelete = (id: string) => {
    const updatedVariables = variables.filter(variable => variable.id !== id);
    setVariables(updatedVariables);
    removeVariable(id);
  };

  const handleClick = (variable: VariableData) => {
    AddTipTapComponent(variable.value);
    console.log("Variable details:", variable);
  };

  if (variables.length === 0) return <></>;

  return (
    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-64 bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Variables</h2>
      <div className="flex flex-col gap-2">
        {variables.map(variable => (
          <div key={variable.id} 
               className="p-3 bg-white rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 cursor-pointer relative" 
               onClick={() => handleClick(variable)}>
            <button 
              className="absolute top-1 right-1 text-red-500" 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(variable.id);
              }}>
              &times;
            </button>
            <p><strong>ID:</strong> {variable.id}</p>
            <p><strong>Name:</strong> {variable.variableName}</p>
            <p><strong>Value:</strong> {variable.value}</p>
            <p><strong>Max Char:</strong> {variable.maxSize}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
