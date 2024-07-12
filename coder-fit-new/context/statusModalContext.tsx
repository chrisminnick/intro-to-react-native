import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StatusModalContextType {
  statusModal: { isVisible: boolean; status: string };
  setStatusModal: React.Dispatch<
    React.SetStateAction<{ isVisible: boolean; status: string }>
  >;
}

interface StatusModalProviderProps {
  children: ReactNode;
}

const StatusModalContext = createContext<StatusModalContextType | undefined>(
  undefined
);

export const StatusModalProvider: React.FC<StatusModalProviderProps> = ({
  children,
}) => {
  const [statusModal, setStatusModal] = useState({
    isVisible: false,
    status: '',
  });

  return (
    <StatusModalContext.Provider value={{ statusModal, setStatusModal }}>
      {children}
    </StatusModalContext.Provider>
  );
};

export const useStatusModal = () => {
  const context = useContext(StatusModalContext);
  if (!context) {
    throw new Error('useStatusModal must be used within a StatusModalProvider');
  }
  return context;
};
