import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type ModalConfirmationProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
};

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ title, message, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm z-40" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-black">{title}</h2>
        <p className="text-gray-700 mb-10">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary transition-all duration-300 mr-2"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition-all duration-300" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
