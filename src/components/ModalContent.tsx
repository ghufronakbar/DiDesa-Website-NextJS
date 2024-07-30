import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type ModalContentProps = {
  title: string;
  content: React.ReactNode  
  onClose: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <p className="text-gray-700 mb-10">{content}</p>
        <div className="flex justify-end">   
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
