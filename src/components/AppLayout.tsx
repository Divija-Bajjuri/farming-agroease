import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import HeroSection from './HeroSection';
import Dashboard from './Dashboard';
import Chatbot from './Chatbot';
import Weather from './Weather';
import FertilizerRecommendation from './FertilizerRecommendation';
import GovernmentSchemes from './GovernmentSchemes';
import MachineryRental from './MachineryRental';
import ProfilePage from './ProfilePage';

const AppLayout: React.FC = () => {
  const { user, loading } = useAuth();
  const { currentPage, darkMode } = useApp();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Loading KrishiMitra...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (!user) return <HeroSection />;
    
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'chatbot': return <Chatbot />;
      case 'weather': return <Weather />;
      case 'fertilizer': return <FertilizerRecommendation />;
      case 'machinery': return <MachineryRental />;
      case 'schemes': return <GovernmentSchemes />;
      case 'profile': return <ProfilePage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <Sidebar />
      <main className={`${user ? 'pb-20 lg:pb-0' : ''}`}>
        {renderPage()}
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
