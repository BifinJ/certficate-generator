import VariableData from '@/interfaces/VariableData';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: VariableData) => void;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<VariableData>({
    id: 0,
    variableName: '',
    value: '',
    maxSize: ''
  });

useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, id: Date.now() })); // generate unique ID
    }
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      id: 0,
      variableName: '',
      value: '',
      maxSize: ''
    });
    onClose();
  };

  const handleSave = () => {
    onSave(formData);
    handleCancel()
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-75 backdrop-blur-sm p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add Components</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Variable Name</label>
            <input 
              type="text"
              name="variableName"
              value={formData.variableName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Value</label>
            <input 
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Maximum Character Size</label>
            <input 
              type="text"
              name="maxSize"
              value={formData.maxSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
