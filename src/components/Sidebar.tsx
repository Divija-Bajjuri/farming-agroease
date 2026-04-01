import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useApp, type AppPage } from '@/contexts/AppContext';

const navItems: { key: AppPage; icon: string }[] = [
  { key: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { key: 'chatbot', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { key: 'weather', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { key: 'fertilizer', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { key: 'machinery', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { key: 'schemes', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { key: 'profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
];

const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { currentPage, setCurrentPage, darkMode, sidebarOpen, setSidebarOpen } = useApp();

  if (!user || !sidebarOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      <div className={`fixed left-0 top-0 bottom-0 z-50 w-72 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r shadow-xl transform transition-transform lg:hidden`}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('app.title')}</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <svg className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* User Info */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.mobile}</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setCurrentPage(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                currentPage === item.key
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold'
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'}`
              }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              {t(`nav.${item.key}`)}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <button onClick={() => { logout(); setSidebarOpen(false); setCurrentPage('home'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            {t('nav.logout')}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
