import React, { createContext, useContext, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Toast } from './Toast';
import { styled } from 'nativewind';

const StyledView = styled(View);

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback((options: ToastOptions) => {
    setToast(options);
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Small delay before removing the toast to allow animation to complete
    setTimeout(() => {
      setToast(null);
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && toast && (
        <StyledView className="absolute top-0 left-0 right-0 z-50 p-4">
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={handleClose}
          />
        </StyledView>
      )}
    </ToastContext.Provider>
  );
}; 