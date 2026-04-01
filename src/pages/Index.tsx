import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppProvider>
          <AppLayout />
        </AppProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
