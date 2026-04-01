import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import type { Language } from '@/lib/i18n';
import AuthModal from './AuthModal';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'hi', label: 'हिंदी', flag: 'हि' },
  { code: 'te', label: 'తెలుగు', flag: 'తె' },
];

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { currentPage, setCurrentPage, unreadCount, darkMode, toggleDarkMode, sidebarOpen, setSidebarOpen } = useApp();
  const [authOpen, setAuthOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = user ? [
    { key: 'dashboard' as const, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { key: 'chatbot' as const, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { key: 'weather' as const, icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  ] : [];

  return (
    <>
      <nav className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage(user ? 'dashboard' : 'home')}>
              {user && (
                <button onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
              )}
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <div className="hidden sm:block">
                <h1 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('app.title')}</h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('app.subtitle')}</p>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <button key={item.key} onClick={() => setCurrentPage(item.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                    currentPage === item.key
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`
                  }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                {LANGUAGES.map(lang => (
                  <button key={lang.code} onClick={() => setLanguage(lang.code)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition ${
                      language === lang.code
                        ? 'bg-green-600 text-white shadow-sm'
                        : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`
                    }`}>
                    {lang.flag}
                  </button>
                ))}
              </div>

              {/* Dark Mode */}
              <button onClick={toggleDarkMode} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              {/* Notifications */}
              {user && (
                <div className="relative">
                  <button onClick={() => setNotifOpen(!notifOpen)} className={`p-2 rounded-lg relative ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-500'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{unreadCount}</span>
                    )}
                  </button>
                </div>
              )}

              {/* User / Login */}
              {user ? (
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`hidden sm:block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{user.name.split(' ')[0]}</span>
                  </button>
                  {profileOpen && (
                    <div className={`absolute right-0 top-full mt-2 w-48 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-lg py-2 z-50`}>
                      <button onClick={() => { setCurrentPage('profile'); setProfileOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left text-sm ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} flex items-center gap-2`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        {t('nav.profile')}
                      </button>
                      <hr className={`my-1 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`} />
                      <button onClick={() => { logout(); setProfileOpen(false); setCurrentPage('home'); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition text-sm">
                  {t('nav.login')}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Navbar;
