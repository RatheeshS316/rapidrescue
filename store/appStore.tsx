import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Settings {
  notifications: boolean;
  sosAlerts: boolean;
  offlineMode: boolean;
  pinLock: boolean;
  gps: boolean;
  autoShareLoc: boolean;
  voiceSOS: boolean;
  darkMode: boolean;
  shakeSOS: boolean;
}

interface AppState {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  currentLang: string;
  setCurrentLang: (v: string) => void;
  isOnline: boolean;
  setIsOnline: (v: boolean) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  settings: Settings;
  toggleSetting: (key: keyof Settings) => void;
  selectedContact: string;
  setSelectedContact: (v: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentLang, setCurrentLang] = useState('EN');
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    sosAlerts: true,
    offlineMode: false,
    pinLock: false,
    gps: true,
    autoShareLoc: true,
    voiceSOS: false,
    darkMode: true,
    shakeSOS: true,
  });

  const toggleSetting = (key: keyof Settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      fullName, setFullName,
      email, setEmail,
      currentLang, setCurrentLang,
      isOnline, setIsOnline,
      isLoading, setIsLoading,
      settings, toggleSetting,
      selectedContact, setSelectedContact,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used within AppProvider');
  return ctx;
};
