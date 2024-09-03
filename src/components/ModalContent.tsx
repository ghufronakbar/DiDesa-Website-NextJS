import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type ModalContentProps = {
  title: string;
  content: React.ReactNode  
  onClose: () => void;
  onConfirm?: () => void;
  onConfirmText?: string;
};

const ModalContent: React.FC<ModalContentProps> = ({ title, content, onClose, onConfirm, onConfirmText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm z-40" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        </div>
        <p className="text-gray-700 mb-10">{content}</p>
        <div className="flex justify-end gap-2">  
          {onConfirmText && (
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all duration-300" onClick={onConfirm}>
              {onConfirmText}
            </button>
          )} 
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition-all duration-300" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
