'use client';
import React, { createContext, useContext } from 'react';

const UserContext = createContext<string | null>(null);

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: string;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
