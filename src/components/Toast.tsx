import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AiOutlineClose, AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import classNames from 'classnames';

type ToastContextType = {
  showToast: (text: string, status: 'success' | 'error' | 'info') => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

type ToastProps = {
  text: string;
  status: 'success' | 'error' | 'info';
  onClose: () => void;
  index: number;
};

const Toast: React.FC<ToastProps> = ({ text, status, onClose, index }) => {
  const iconClasses = 'mr-3 text-xl';

  const statusClasses = classNames(
    'flex items-center p-4 rounded-lg shadow-lg mb-4 transition-transform duration-300 transform-gpu',
    {
      'bg-primary text-white': status === 'success',
      'bg-secondary text-white': status === 'error',
      'bg-primary text-white ': status === 'info',
    },
    'animate-bounce-in-right',    
  );

  const icon = {
    success: <AiOutlineCheckCircle className={iconClasses} />,
    error: <AiOutlineCloseCircle className={iconClasses} />,
    info: <AiOutlineInfoCircle className={iconClasses} />,
  }[status];

  return (
    <div className={statusClasses}>
      {icon}
      <div className="flex-1">{text}</div>
      <button onClick={onClose} className="text-lg text-gray-200 hover:text-gray-400 transition-colors ml-4">        
        <AiOutlineClose />
      </button>
    </div>
  );
};

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: number; text: string; status: 'success' | 'error' | 'info' }[]>([]);

  const showToast = (text: string, status: 'success' | 'error' | 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, text, status }]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            text={toast.text}
            status={toast.status}
            onClose={() => removeToast(toast.id)}
            index={index}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
