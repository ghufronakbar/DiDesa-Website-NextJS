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
};

const Toast: React.FC<ToastProps> = ({ text, status, onClose }) => {
  const iconClasses = 'mr-3';

  const statusClasses = classNames({
    'bg-green-100 border-green-500 text-green-700': status === 'success',
    'bg-red-100 border-red-500 text-red-700': status === 'error',
    'bg-blue-100 border-blue-500 text-blue-700': status === 'info',
  });

  const icon = {
    success: <AiOutlineCheckCircle className={iconClasses} />,
    error: <AiOutlineCloseCircle className={iconClasses} />,
    info: <AiOutlineInfoCircle className={iconClasses} />,
  }[status];

  return (
    <div className={`flex items-center border-l-4 p-4 rounded shadow-lg mb-4 ${statusClasses}`}>
      {icon}
      <div className="flex-1">{text}</div>
      <button onClick={onClose} className="text-lg text-gray-700 ml-4">
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
    setToasts([...toasts, { id, text, status }]);
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
      <div className="fixed bottom-4 right-4 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} text={toast.text} status={toast.status} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
