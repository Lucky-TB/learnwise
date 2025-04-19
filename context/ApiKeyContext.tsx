import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GEMINI_API_KEY } from '@env';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  saveApiKey: (key: string) => Promise<void>;
  isLoading: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string>(GEMINI_API_KEY);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadApiKey = async () => {
      try {
        const storedKey = await AsyncStorage.getItem('gemini_api_key');
        if (storedKey) {
          setApiKeyState(storedKey);
        }
      } catch (error) {
        console.error('Error loading API key:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApiKey();
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
  };

  const saveApiKey = async (key: string) => {
    try {
      await AsyncStorage.setItem('gemini_api_key', key);
      setApiKeyState(key);
    } catch (error) {
      console.error('Error saving API key:', error);
    }
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, saveApiKey, isLoading }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}; 