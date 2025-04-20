import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsContextType {
  highContrast: boolean;
  textSize: number;
  textToSpeech: boolean;
  setHighContrast: (value: boolean) => Promise<void>;
  setTextSize: (value: number) => Promise<void>;
  setTextToSpeech: (value: boolean) => Promise<void>;
}

const STORAGE_KEYS = {
  HIGH_CONTRAST: '@settings_high_contrast',
  TEXT_SIZE: '@settings_text_size',
  TEXT_TO_SPEECH: '@settings_text_to_speech',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrastState] = useState(false);
  const [textSize, setTextSizeState] = useState(1.0);
  const [textToSpeech, setTextToSpeechState] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [highContrastValue, textSizeValue, textToSpeechValue] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HIGH_CONTRAST),
        AsyncStorage.getItem(STORAGE_KEYS.TEXT_SIZE),
        AsyncStorage.getItem(STORAGE_KEYS.TEXT_TO_SPEECH),
      ]);

      if (highContrastValue !== null) {
        setHighContrastState(JSON.parse(highContrastValue));
      }
      if (textSizeValue !== null) {
        setTextSizeState(JSON.parse(textSizeValue));
      }
      if (textToSpeechValue !== null) {
        setTextToSpeechState(JSON.parse(textToSpeechValue));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const setHighContrast = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HIGH_CONTRAST, JSON.stringify(value));
      setHighContrastState(value);
    } catch (error) {
      console.error('Error saving high contrast setting:', error);
    }
  };

  const setTextSize = async (value: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TEXT_SIZE, JSON.stringify(value));
      setTextSizeState(value);
    } catch (error) {
      console.error('Error saving text size setting:', error);
    }
  };

  const setTextToSpeech = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TEXT_TO_SPEECH, JSON.stringify(value));
      setTextToSpeechState(value);
    } catch (error) {
      console.error('Error saving text-to-speech setting:', error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        highContrast,
        textSize,
        textToSpeech,
        setHighContrast,
        setTextSize,
        setTextToSpeech,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 