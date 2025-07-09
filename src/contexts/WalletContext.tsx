
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0.00');

  const connectWallet = async () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setAddress('0x742d35Cc6734C0532925a3b8D1C9A4C8F6');
      setBalance('1,234.56');
    }, 1000);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance('0.00');
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      address,
      balance,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};
