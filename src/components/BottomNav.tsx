import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useApp, type AppPage } from '@/contexts/AppContext';

const navItems: { key: AppPage; icon: string; labelKey: string }[] = [
  { key: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', labelKey: 'nav.home' },
  { key: 'chatbot', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', labelKey: 'nav.chatbot' },
  { key: 'weather', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', labelKey: 'nav.weather' },
  { key: 'schemes', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', labelKey: 'nav.schemes' },
];

const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { currentPage, setCurrentPage, darkMode } = useApp();

  if (!user) return null;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-30 lg:hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t pb-[env(safe-area-inset-bottom)]`}>

      <div className="flex justify-around items-center py-2">
        {navItems.map(item => (
          <button key={item.key} onClick={() => setCurrentPage(item.key)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-[56px] transition ${
              currentPage === item.key
                ? 'text-green-600'
                : `${darkMode ? 'text-gray-500' : 'text-gray-400'}`
            }`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentPage === item.key ? 2.5 : 2} d={item.icon} /></svg>
            <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
